document.addEventListener('DOMContentLoaded', function() {
    // 防止移动端浏览器工具栏导致的视口问题
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // 初始化Swiper
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        speed: 600,
        resistance: true,
        resistanceRatio: 0.5,
        
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        
        effect: 'slide',
        
        // 优化移动端触摸体验
        touchStartPreventDefault: false,
        touchMoveStopPropagation: true,
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
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
            
            touchStart: function () {
                this.params.speed = 600;
            },
            touchEnd: function () {
                this.params.speed = 300;
            }
        }
    });

    // 禁用浏览器默认的触摸行为
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}); 