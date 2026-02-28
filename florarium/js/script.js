// ⢿⣶⣄
// ⠀⠈⠻⢿⣶⣄
// ⠀⠀⠀⠀⠈⠹⢿⣶⣄   С ДНЕМ
// ⠀⠀⠀⠀⠀⠀⠀⠈⠛⢷⣦⣄   ЗАЩИТНИКА ОТЕЧЕСТВА!
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣶⣄⣀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡽⢿⣛⣿⣿⣿⣿⣷⣶⣶⣶⣶⡄ 
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⣀⣉⣀⣿⣿⣿⣿⣿⣿⣿⣿
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣤⣭⣭⣭⣭⣥⣬⣭⣭⣭⣽⣿⣏⡀⡤⠤⣄⣀
// ⠀⠀⠀⢀⣀⣀⣀⣀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⣿⣿⣯⣽⢿⣿⣷
// ⠀⠀⠀⣾⣿⣿⣿⣏⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣧⣛⣲⣦⣭⣍⣉⣉⣙⣒⡆
// ⠀⠀⠀⠹⡀⠀⢱⡰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣾⡁⠀⠀⡇⣿⡇⣿⡇⢻⡍⢿⢻⣿⢹
// ⠀⠀⠀⠀⠙⣄⠀⠑⢜⣿⠛⣻⡟⣻⢿⢛⡿⣟⣿⣣⠀⠀⠻⣿⡇⢸⡇⢸⢧⢸⣿⣿⡾
// ⠀⠀⠀⠀⠀⠀⠑⠤⠤⠿⠯⠥⠼⠓⠒⠛⠉⠉⠉⠁⠳⣄⣀⣈⣿⣟⣿⣾⠿⠛⠛⠉

'use strict'

document.addEventListener('DOMContentLoaded', () => {

    // тонировка
    const overlay = document.querySelector('.overlay');

    // заказать звонок (открытие и закрытие)
    const closePopap = document.querySelector('.close');
    const orderCallButtons = document.querySelectorAll('.order-call');
    const popapOrderCall = document.getElementById('popap__order-call');
    const formCall = document.getElementById('form-call');
    const successMessage = document.querySelector('.success-message');
    const phoneInput = document.getElementById('phone');
    const errorInpuPhone = document.querySelector('.error-input__phone');
    // открыть
    orderCallButtons.forEach(button => {
        button.addEventListener('click', () => {
            popapOrderCall.classList.add('open');
            overlay.classList.add('open');
        });
    });
    // закрыть
    closePopap.addEventListener('click', () => {
        popapOrderCall.classList.remove('open');
        successMessage.style.display = 'none';
        formCall.style.display = 'block';
        overlay.classList.remove('open');
        resetForm();
    });

    // валидация и отправка
    formCall.addEventListener('submit', async (e) => {
        e.preventDefault(); // отмена отправки

        // валидация
        const phone = phoneInput.value.trim();
        if (!phone) {
            showError();
            return;
        }

        const formData = new FormData();
        formData.append('name', phone);

        try {
            const response = await fetch('https://testologia.ru/checkout', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success === 0) {
                formCall.style.display = 'none';
                successMessage.style.display = 'block';
            } else {
                alert(result.message || 'Одна ошибка и ты ошибся');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка подключения. Попробуйте позже.');
        }
    });

    // функция ошибка
    function showError() {
        errorInpuPhone.style.color = 'red';
        phoneInput.style.border = '7px solid red';
    }

    // функция сброс стилей
    function resetForm() {
        errorInpuPhone.style.color = '';
        phoneInput.value = '';
        phoneInput.style.border = '7px solid var(--bgGreen)';
    }

    // закрытие на оверлей
    // overlay.addEventListener('click', () => {
    //     popapOrderCall.style.display = 'none';
    // });

    // адаптивная менюшка    
    const burgerMenu = document.getElementById('burger');
    const buttonBurger = document.getElementById('menu_button');
    // открыть
    buttonBurger.addEventListener('click', () => {
        burgerMenu.classList.toggle('open');
        buttonBurger.classList.toggle('paused');
    });
    // закрыть
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !buttonBurger.contains(e.target)) {
            burgerMenu.classList.remove('open');
            buttonBurger.classList.remove('paused');
        }
    });

    // переклюки флоры и архид
    const florariumBtn = document.querySelector('.btn-florarium');
    const orhidariumBtn = document.querySelector('.btn-orhidarium');
    const florariumPlants = document.querySelector('.florariumPlants');
    const orhidariumPlants = document.querySelector('.orhidariumPlants');

    const showFlorarium = () => {
        orhidariumPlants.style.display = 'none';
        florariumPlants.style.display = 'grid';
    };
    const showOrhidarium = () => {
        orhidariumPlants.style.display = 'grid';
        florariumPlants.style.display = 'none';
    };
    florariumBtn.addEventListener('click', showFlorarium);
    orhidariumBtn.addEventListener('click', showOrhidarium);

    // оформить заказ
    const orderPlants = document.getElementById('orderPlants');
    const openOrderPlants = document.getElementById('popapOrder');
    const quitOrderPlants = document.getElementById('quit');
    const popapThanksBtn = document.getElementById('continueShopping');
    const textArea = document.getElementById('comment');

    // открыть
    orderPlants.addEventListener('click', () => {
        openOrderPlants.classList.add('open');
        overlay.classList.add('open');
    });
    // закрыть
    quitOrderPlants.addEventListener('click', () => {
        openOrderPlants.classList.remove('open');
        overlay.classList.remove('open');
        resetOrderForm()
    });
    // закрыть благодарность
    popapThanksBtn.addEventListener('click', () => {
        openOrderPlants.classList.remove('open');
        overlay.classList.remove('open');
        resetOrderForm();
    });

    // функция сброса формы
    function resetOrderForm() {
        formOrderName.value = '';
        formOrderName.style.border = '1px solid black';
        formOrderErrName.style.color = '';
        formOrderPhone.value = '';
        formOrderPhone.style.border = '1px solid black';
        formOrderErrPhone.style.color = '';
        textArea.value = '';
        orderWrap.style.display = 'grid';
        thanksWrap.style.display = 'none';
    }

    // валидация и отправка
    const formOrder = document.getElementById('form_order');
    const formOrderName = document.getElementById('form_order_name');
    const formOrderPhone = document.getElementById('form_order_phone');
    const orderWrap = document.querySelector('.popap-order-wrap');
    const thanksWrap = document.querySelector('.popap-order-thanks');
    const formOrderErrName = document.querySelector('.error-input__name');
    const formOrderErrPhone = document.querySelectorAll('.error-input__phone')[1];

    formOrder.addEventListener('submit', async (e) => {
        e.preventDefault(); // отмена отправки

        // валидация
        const orderName = formOrderName.value.trim();
        const orderPhone = formOrderPhone.value.trim();

        let hasError = false;

        if (!orderName) {
            formOrderErrName.style.color = 'red';
            formOrderName.style.border = '1px solid red';
            hasError = true;
        } else {
            formOrderErrName.style.color = '';
            formOrderName.style.border = '1px solid black';
        };

        if (!orderPhone) {
            formOrderErrPhone.style.color = 'red';
            formOrderPhone.style.border = '1px solid red';
            hasError = true;
        } else {
            formOrderErrPhone.style.color = '';
            formOrderPhone.style.border = '1px solid black';
        };

        if (hasError) return;

        const formData = new FormData();
        formData.append('name', orderName);
        formData.append('phone', orderPhone);

        try {
            const response = await fetch('https://testologia.ru/checkout', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success === 1) {
                orderWrap.style.display = 'none';
                thanksWrap.style.display = 'flex';
            } else {
                alert(result.message || 'Ошибка');
            }
        } catch (err) {
            console.error(err);
            alert('Oшибка подключения. Попробуйте позже');
        }
    });

    //_______________________________________//
    // попап с картинками
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });

    //настройки по выводу слайдов в зависимости от разрешения экрана
    $('.reviews__item-wrap').slick({
        dots: true,
        initialSlide: 2,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1501,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});


