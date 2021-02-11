const burger = (menuSelector, burgerSelector, ) => {
    const upElem = document.querySelector(menuSelector),
        burgerElem = document.querySelector(burgerSelector);
    upElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if (upElem.style.display == 'none' && window.screen.availWidth < 993) {
            upElem.style.display = 'block';
        } else {
            upElem.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            upElem.style.display = 'none';
        }
    });


};

export default burger;