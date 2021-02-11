import {
    getResource
} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.remove();
    // });
    btn.addEventListener('click', function () {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('animated', 'fadeInUp', 'status');
        btn.parentNode.appendChild(statusMessage);

        getResource('http://localhost:3000/styles')
            .then(res => createCards(res))
            .catch(error => statusMessage.textContent = 'Что то пошло не так....');

        this.remove();
    });

    function createCards(responce) {
        responce.forEach(({
            src,
            title,
            link
        }) => {
            let card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
                <div class="styles-block">
                    <img src = ${src} alt="style">
                    <h4>${title}</h4>
                    <a href="${link}">Подробнее</a>
                </div> 
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }

    // function errorMessage(elem) {
    //     let textMessege = document.createElement('div');

    //     textMessege.textContent = 'Что то пошло не так...';

    //     elem.parrentNode.appendChild(textMessege);

    // }
};

export default showMoreStyles;

{
    /* <div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
        <div class=styles-block>
            <img src=assets/img/styles-5.jpg alt>
            <h4>Пастелью</h4>
            <a href="#">Подробнее</a>
        </div> */
}