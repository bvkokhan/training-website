// import checkNumInputs from './checkNumInputs';
// import closeModal from './modals';
import {
    postData
} from '../services/requests';
const forms = () => {

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    //Получаем элементы. Form и input получаем все что есть.

    // phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    // checkNumInputs('input[name="user_phone"]');

    // phoneInputs.forEach(item => {
    //     item.addEventListener('input', () => {
    //         item.value = item.value.replace(/\D/, '');
    //     });
    // });

    const message = {
        loading: 'Загрузка..',
        success: 'Спасибо, мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так(',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };
    // Блок с сообщениями пользователю при отправки данных на сервер.

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };
    // объект с путями для отправки данных. В зависимости от типа мод. окна, мы будем отправлять данные в разные места.



    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };
    // функция, которя чистит все инпуты, обращаясь к полю value.

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            // навешиваем обработчик на формы и отменяем стандартное поведение.

            let statusMessage = document.createElement('div');
            // создаем элемент для сообщения пользователю.
            statusMessage.classList.add('status');
            // добавляем класс элементу.
            item.parentNode.appendChild(statusMessage);
            // помещаем его в родителя формы
            item.classList.add('animated', 'fadeOutUp');
            // добавим форме 2 класса. Animated - позволяет анимировать эл. fadeUpout - 
            //красиво сделать форму прозрачной. 
            setTimeout(() => {
                item.style.display = 'none';
            }, 400); // через 400 мс убираем вообще форму со страницы.

            let statusImg = document.createElement('img');
            // создаем в переменной тег img.
            statusImg.setAttribute('src', message.spinner);
            // устанавливаем тегу источник из нашего объекта с сообщениями пользователю.
            statusImg.classList.add('animated', 'fadeInUp');
            // добавляем спинеру классы с анимацией.
            statusMessage.appendChild(statusImg);
            // помещаем наш спиннер в блок statusMessage.

            let textMessege = document.createElement('div');
            // создаем текстовое сопровождение спиннеру.
            textMessege.textContent = message.loading;
            // помещаем в него текст из объекта с сообщениеями.
            statusMessage.appendChild(textMessege);
            // добавляем на страницу, к спиннеру текстовый блок.


            const formData = new FormData(item);
            // с помощью ф-ции конструктора создаем объект Form Data, который собирает данные из форм.
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            // если обертка формы(ближайший класс прородителя) = .popup-design, от путь к нашему серверу
            //designer, если нет - question
            console.log(api);
            postData(api, formData).then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessege.textContent = message.success;

                })
                // используем ф-цию для отправки данных на сервер(в ответ от ф-ции мы получаем promise). 
                //Promice обрабатываем с помощью чейнинга. и выводим сообщения: success.
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessege.textContent = message.failure;
                })
                // с помощью чейнинга выводим failure. и выводим нашу картинку.
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        // удаляем сообщение
                        item.style.display = 'block';
                        // возвращаем форме block
                        item.classList.remove('fadeOutUp');
                        // удаляем анимированное скрытие
                        item.classList.add('fadeInUp');
                        //добавим аним. появление.
                    }, 4000);

                    if (item.getAttribute('data-calc') == "end") {
                        setTimeout(() => {
                            item.closest('.popup_calc_end').style.dispay = 'none';
                        }, 6000);
                    }
                });
            // в разделе finaly(в любом случае) очищаем инпуты и убераем наши сообщения.
        });
    });


};

export default forms;