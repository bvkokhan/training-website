'use strict';

let btnPressed = false;

function bindModal(triggerSelector, modalSelector, closeSelector, modalTimerId, destroy = false) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();

    modalTrigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }

            btnPressed = true;

            if (destroy) {
                item.remove();
            }

            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn');
            });
            openModal(modalSelector, modalTimerId);
            document.body.style.marginRight = `${scroll}px`;
            // добавим отступ на ширину скролла что бы не прыгала страница при открытии


        });
    });

    close.addEventListener('click', () => {
        windows.forEach(item => {
            item.style.display = 'none';
        });
        closeModal(modalSelector);
        document.body.style.marginRight = `0px`;
        // уберем отступ на ширину скролла что бы не прыгала страница при закрытии
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            closeModal(modalSelector);
            document.body.style.marginRight = `0px`;
            // уберем отступ на ширину скролла что бы не прыгала страница при закрытии
        }

    });

    // document.addEventListener('keydown', (event) => {
    //     if (event.code === 'Escape' && modal.classList.contains('show')) {
    //         closeModal(modalSelector);
    //     }
    // });




}

function calcScroll() {
    // функция для вычесления ширины скролла.
    let div = document.createElement('div');
    // создаем произвольный элемент.
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    // задаем ему стили - размеры - не выжны, важно div.style.overflowY = 'scroll'

    document.body.appendChild(div);
    // добавляем элемент на страницу
    let scrollWidth = div.offsetWidth - div.clientWidth;
    // Создаем переменную ширина скролла. Расчитываем ее: берем наш блок и узнаем его полную ширину.
    // Это div.offsetWidth. От нее отнимаем div.clientWidth (он включает только пэддинги и главный контент,
    // не включаая прокрутку). В итоге получаем ширину прокрутки, и записываем в переменную, которую из 
    //ф-ции возвращаем. 
    div.remove();
    // удаляем технический объект.

    return scrollWidth;
    // возвращаем из функции ширину скролла.
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        gift = document.querySelector('.fixed-gift'),
        scroll = calcScroll();
    gift.style.marginRight = `${scroll}px`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector),
        gift = document.querySelector('.fixed-gift');
    gift.style.marginRight = `0px`;

    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function openByScroll(selector) {
    window.addEventListener('scroll', () => {
        if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >=
                document.documentElement.scrollHeight)) {
            document.querySelector(selector).click();
        }
    });
}

export default bindModal;
export {
    openModal
};
export {
    closeModal
};
export {
    calcScroll
};
export {
    openByScroll
};