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

    // 提取图片边缘颜色并设置背景
    function setSlideColors(slide) {
        const img = slide.querySelector('img');
        if (!img.complete) {
            img.onload = () => processImage(img, slide);
        } else {
            processImage(img, slide);
        }
    }

    function processImage(img, slide) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        // 获取更多行的数据来确保获取纯色区域
        const topRows = ctx.getImageData(0, 0, canvas.width, 10).data;
        const bottomRows = ctx.getImageData(0, canvas.height - 10, canvas.width, 10).data;

        // 获取最常见的颜色
        const topColor = getMostFrequentColor(topRows);
        const bottomColor = getMostFrequentColor(bottomRows);

        // 设置滑块的CSS变量
        slide.style.setProperty('--top-color', topColor);
        slide.style.setProperty('--bottom-color', bottomColor);
        
        // 设置图片高度比例
        const heightRatio = (img.naturalHeight / img.naturalWidth) * 100;
        slide.style.setProperty('--image-height', `${heightRatio}%`);
    }

    function getMostFrequentColor(pixels) {
        const colorMap = new Map();
        
        // 遍历像素数据，统计颜色出现频率
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const colorKey = `${r},${g},${b}`;
            
            colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
        }
        
        // 找出出现最多的颜色
        let maxCount = 0;
        let dominantColor = '255,255,255'; // 默认白色

        for (const [color, count] of colorMap.entries()) {
            if (count > maxCount) {
                maxCount = count;
                dominantColor = color;
            }
        }
        
        const [r, g, b] = dominantColor.split(',').map(Number);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // 为所有滑块设置颜色
    document.querySelectorAll('.swiper-slide').forEach(setSlideColors);
}); 