'use strict';
// ============  Header Menu
const menuBtn = document.getElementById('nav-toggler-btn');
const menuContent = document.getElementById('header-menu');
const navLinks = document.querySelectorAll('.header__menu-link');

menuBtn.addEventListener('click', toggleMenu);
navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

function toggleMenu() {
    menuBtn.classList.toggle('open');
    const isActive = menuBtn.classList.contains('open');

    if (isActive) {
        menuContent.style.maxHeight = menuContent.scrollHeight + 'px';
    } else {
        menuContent.style.maxHeight = null;
    }
}
function closeMenu() {
    menuBtn.classList.remove('open');
    menuContent.style.maxHeight = null;
}

// Show & Hide Button Scroll to Top
const btnUp = document.querySelector('.btn-up');
const header = document.querySelector('.header');
window.onscroll = function () {
    const windowHeight = window.innerHeight;

    if (window.scrollY > 2 * windowHeight) {
        btnUp.classList.add('show');
    } else {
        btnUp.classList.remove('show');
    }

    if (window.scrollY >= 20) {
        header.classList.add('expand');
    } else {
        header.classList.remove('expand');
    }
};

// ==================== Footer Year
const footerYear = document.getElementById('full-year');
footerYear.textContent = new Date().getFullYear();

// ===================== Timer
const items = document.querySelectorAll('.timer__item-time');

//Setting Date
// Note: Date Format should be sring
// futureDate = YYYY/MM/DD /HH/MM/SS GMT+0800 => Hong Kong Time zone
// const futureDate = new Date('2024-02-27 12:00:00 GMT+0800');

// const now = new Date();
// const futureDates = new Date(now.getFullYear(), now.getMonth() + 3, 1);

const currentDate = new Date();
const currentUTCOffset = -8; // Hong Kong time offset from UTC is typically +8 hours
const currentHongKongTime = currentDate.getTime() + currentUTCOffset * 60 * 60 * 1000;
const hongKongDate = new Date(currentHongKongTime);

// Calculate the future date 60 days from now
const futureDates = new Date(hongKongDate.getTime() + 60 * 24 * 60 * 60 * 1000);

// Format the future date
const futureYear = futureDates.getFullYear();
const futureMonth = String(futureDates.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
const futureDay = String(futureDates.getDate()).padStart(2, '0');
const futureHours = String(futureDates.getHours()).padStart(2, '0');
const futureMinutes = String(futureDates.getMinutes()).padStart(2, '0');
const futureSeconds = String(futureDates.getSeconds()).padStart(2, '0');

// Construct the date string
const timerDates = `${futureYear}-${futureMonth}-${futureDay} ${futureHours}:${futureMinutes}:${futureSeconds} GMT+0800`;

console.log(timerDates);

const timerDate = '2024-05-31T17:00:00.000Z';

const futureDate = new Date(timerDates);

//const futureDate
const oneHour = 60 * 60 * 1000;

//Future Time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;
    let day = Math.floor(t / oneDay);
    let hour = Math.floor((t % oneDay) / oneHour);
    let minute = Math.floor((t % oneHour) / oneMinute);
    let second = Math.floor((t % oneMinute) / oneSecond);

    const val = [day, hour, minute, second];
    // if value is less than 10 then throw 0 before the value
    function format(item) {
        if (item < 10) {
            return `0${item}`;
        } else {
            return item;
        }
    }

    //Displaying in the DOM
    items.forEach(function (item, index) {
        if (t > 1) {
            item.innerHTML = format(val[index]);
        } else {
            item.innerHTML = '00';
        }
    });

    if (t < 1) {
        clearInterval(countdown);
    }
}

//Countdown
let countdown = setInterval(getRemainingTime, 1000);
//invoking the function after interval
getRemainingTime();
