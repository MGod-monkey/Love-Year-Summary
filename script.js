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
}); 