'use strict';
const emailFields = document.querySelectorAll('.email-field');
const emailBox = document.querySelector('.email-box');
const ctaBtns = document.querySelectorAll('.cta-btn');
const wrongText = document.querySelectorAll('.w-box');
const faqBox = document.querySelector('.faq-box');
const slider = document.querySelector('.slider-container');
const leftBtn = document.querySelector('.slider-btn--left');
const rightBtn = document.querySelector('.slider-btn--right');
const allSlides = document.querySelectorAll('.slide');
const popup = document.querySelector('.popup');

/**********  Email Btn working *********/
const checkerEmail = function (emailField) {
  const emailID = emailField.value;
  if (
    emailID.includes('@') &&
    emailID.includes('.') &&
    emailID.lastIndexOf('.') != emailID.length - 1 &&
    emailID.lastIndexOf('.') != emailID.lastIndexOf('@') + 1
  ) {
    emailField.classList.add('correct');
    emailField.classList.remove('wrong');
    emailField.parentElement
      .querySelector('.w-box')
      .classList.add('hide-w-box');
  } else if (emailID == '') {
    emailField.classList.remove('correct');
    emailField.classList.remove('wrong');
    emailField.parentElement
      .querySelector('.w-box')
      .classList.add('hide-w-box');
  } else {
    // emailField.parentElement.querySelector('.w-text').textContent =
    //   'Please enter a valid email address.';
    emailField.classList.add('wrong');
    emailField.classList.remove('correct');
    emailField.parentElement
      .querySelector('.w-box')
      .classList.remove('hide-w-box');
  }
};

emailFields.forEach(function (el) {
  el.value = '';
});

emailFields.forEach(function (el) {
  el.addEventListener('focusin', function () {
    el.closest('.email-box').classList.add('open');
  });
});

emailFields.forEach(function (el) {
  el.addEventListener('focusout', function () {
    if (el.value == '') el.closest('.email-box').classList.remove('open');
    checkerEmail(el);
  });
});

emailFields.forEach(function (el) {
  el.addEventListener('input', checkerEmail.bind(this, el));
});

/**********  Slider working *********/
const gap = parseInt(window.getComputedStyle(slider).gap);
const slideWidth = allSlides[0].offsetWidth;
let moveSlideBy = 0;

allSlides.forEach(function (el) {
  const leftSlide = el.getBoundingClientRect().left;
  if (leftSlide < slider.offsetWidth) moveSlideBy++;
});

if (moveSlideBy === 0) moveSlideBy = 1;

leftBtn.addEventListener('click', function (e) {
  const curSlide = slider.scrollLeft - (gap + slideWidth) * moveSlideBy;
  slider.scroll({
    left: curSlide,
    behavior: 'smooth',
  });
});

rightBtn.addEventListener('click', function (e) {
  const curSlide = slider.scrollLeft + (gap + slideWidth) * moveSlideBy;
  slider.scroll({
    left: curSlide,
    behavior: 'smooth',
  });
});

/********** Popup Working *********/
const allPopupSlides = document.querySelectorAll('.popup-slide');
const popupContainer = document.querySelector('.overlay');

slider.addEventListener('click', function (e) {
  if (e.target.closest('.slide')) {
    const slideNo = e.target.closest('.slide').dataset.slide;
    allPopupSlides.forEach(function (el) {
      if (el.dataset.slide === slideNo) {
        el.classList.remove('popup-hidden');
        el.parentElement.classList.remove('overlay-hidden');
        document.body.classList.add('body-scroll-hidden');
      } else {
        el.classList.add('popup-hidden');
      }
    });
  }
});

popupContainer.addEventListener('click', function (e) {
  if (e.target === popupContainer || e.target.closest('.popup-close-btn')) {
    {
      popupContainer.classList.add('overlay-hidden');
      document.body.classList.remove('body-scroll-hidden');
    }
  }
});

/**********  Cta working *********/
ctaBtns.forEach(function (cta) {
  cta.addEventListener('click', function (e) {
    const emailField = cta.parentElement.querySelector('.email-field');
    e.preventDefault();
    if (emailField.parentElement.classList.contains('open')) {
      checkerEmail(emailField);
      if (cta.parentElement.querySelector('.hide-w-box') !== null) {
        emailField.value = '';
        emailField.classList.remove('correct');
        emailField.classList.remove('wrong');
        emailField.closest('.email-box').classList.remove('open');
      }
    } else {
      emailField.focus();
    }
  });
});

/**********  FAQ working *********/
[...faqBox.children].forEach(function (faq) {
  faq.classList.add('faq-btn-close');
});

faqBox.addEventListener('click', function (e) {
  if (e.target.closest('.faq')) {
    e.target.closest('.faq').classList.toggle('faq-btn-close');
  }
});

/**********  Popup working *********/

const intersectObs = new IntersectionObserver(
  function (events) {
    const [e1, e2] = events;
    if ((e1 && e1.isIntersecting) || (e2 && e2.isIntersecting)) {
      popup.classList.remove('show-popup');
    } else {
      popup.classList.add('show-popup');
    }
  },
  { root: null, threshold: 0 }
);

intersectObs.observe(document.querySelector('.hero'));
intersectObs.observe(document.querySelector('.last-cta'));
