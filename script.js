document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.section');
    const upArrow = document.querySelector('.up-arrow');
    const downArrow = document.querySelector('.down-arrow');
    let currentSection = 0;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSection = index;
        }
    }

    upArrow.addEventListener('click', () => {
        scrollToSection(currentSection - 1);
    });

    downArrow.addEventListener('click', () => {
        scrollToSection(currentSection + 1);
    });

    // 添加键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            scrollToSection(currentSection - 1);
        } else if (e.key === 'ArrowDown') {
            scrollToSection(currentSection + 1);
        }
    });

    // 添加触摸滑动支持
    let touchStartY = 0;
    let touchEndY = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    container.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        if (touchStartY > touchEndY + 50) {
            scrollToSection(currentSection + 1);
        } else if (touchStartY < touchEndY - 50) {
            scrollToSection(currentSection - 1);
        }
    });

    // 初始化 Swiper 时添加以下配置
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        speed: 600, // 增加过渡时间
        resistance: true,
        resistanceRatio: 0.5, // 增加阻尼效果
        
        // 添加平滑效果
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        
        // 优化过渡效果
        effect: 'slide',
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // 监听滑动到最后一页
        on: {
            slideChange: function () {
                const isLastSlide = this.isEnd;
                const nextButton = document.querySelector('.swiper-button-next');
                
                if (isLastSlide) {
                    nextButton.style.opacity = '0';
                    nextButton.style.pointerEvents = 'none';
                } else {
                    nextButton.style.opacity = '1';
                    nextButton.style.pointerEvents = 'auto';
                }
            },
            
            // 优化触摸事件
            touchStart: function () {
                this.params.speed = 600;
            },
            touchEnd: function () {
                this.params.speed = 300;
            }
        }
    });
}); 