document.addEventListener('DOMContentLoaded', function() {
    // 视口高度修复
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        speed: 800,
        mousewheel: true,
        effect: 'slide',
        resistance: true,
        resistanceRatio: 0.5,
        touchRatio: 1,
        touchAngle: 45,
        
        // 优化触摸体验
        touchStartPreventDefault: false,
        touchMoveStopPropagation: true,
        
        on: {
            slideChange: function () {
                const arrow = document.querySelector('.scroll-arrow');
                // 在最后一页隐藏箭头
                if (this.isEnd) {
                    arrow.style.opacity = '0';
                    arrow.style.pointerEvents = 'none';
                } else {
                    arrow.style.opacity = '1';
                    arrow.style.pointerEvents = 'auto';
                }
            }
        }
    });

    // 点击箭头滑到下一页
    document.querySelector('.scroll-arrow').addEventListener('click', () => {
        swiper.slideNext();
    });

    // 禁用默认的触摸行为
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    // 音乐控制
    const musicControl = document.querySelector('.music-control');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // 音乐控制点击事件
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.classList.remove('playing');
        } else {
            bgMusic.play();
            musicControl.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // 自动播放（需要用户交互）
    document.addEventListener('click', function initAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicControl.classList.add('playing');
            // 移除这个一次性的事件监听器
            document.removeEventListener('click', initAudio);
        }).catch(err => {
            console.log('Auto play failed:', err);
        });
    }, { once: true });

    // 页面隐藏时暂停音乐
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            bgMusic.pause();
            musicControl.classList.remove('playing');
            isPlaying = false;
        }
    });
}); 