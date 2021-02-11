import bindModal from './modules/modals';
import {
    openModal
} from './modules/modals';

import {
    calcScroll
} from './modules/modals';

import {
    openByScroll
} from './modules/modals';

import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';


window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const modalTimerId = setTimeout(() => {
        const scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
        openModal('.popup-consultation', modalTimerId);
    }, 60000);



    bindModal('.button-design', '.popup-design', '.popup-design .popup-close', modalTimerId);
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close');
    openByScroll('.fixed-gift');
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    pictureSize('.sizes-block');
    accordion('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');

});