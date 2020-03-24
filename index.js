"use strict";

import gallery from "./gallery-items.js";

const galleryList = document.querySelector('.gallery');
const img = document.querySelector('.lightbox__image');
const imgLink = document.querySelector('.js-lightbox');
const closeButton = document.querySelector('.lightbox__button');
const boxOverlay = document.querySelector('.lightbox__overlay');


// Разметка библиотеки/галереи;

const elementsGallery = gallery.reduce(function (acc, item) {
    let liItem = document.createElement('li');
    let link = document.createElement('a');
    let image = document.createElement('img');

    link.appendChild(image);
    liItem.appendChild(link);

    liItem.classList.add('gallery__item');
    link.classList.add('gallery__link');
    image.classList.add('gallery__image');

    link.href = item.original;
    image.src = item.preview;
    image.dataset.source = item.original;
    image.alt = item.description;
    return acc + liItem.outerHTML;
}, '');
galleryList.insertAdjacentHTML('beforeend', elementsGallery);
let imgList = document.querySelectorAll('.gallery__image');
console.log(imgList);

// Делегирование на ul

function handleClick(e) {
    e.preventDefault();
    const target = e.target;
    setActiveLink(target.getAttribute('data-source'), target.getAttribute('alt'));
}

// Передача src и alt в модальное окно

function setActiveLink(activeLink, alt) {
    img.src = activeLink;
    img.alt = alt;
    if (!imgLink.classList.contains('is-open')) {openModal();}
}

// Открытие модального окна

function openModal() {
    imgLink.classList.add('is-open');
}

// Закрытие модального окна клик

function closeModal(e) {
    if (e.target.nodeName !== 'IMG') {
        let modal = document.querySelector('.lightbox');
        modal.classList.remove('is-open');
        img.src = '';
        img.alt = '';
    }
}

// Закрытие модального окна Esc

function closeModalButton() {
    let modal = document.querySelector('.lightbox');
    modal.classList.remove('is-open');
    img.src = '';
    img.alt = '';
}

// Поиск текущей картинки в модалке

function findImg() {
    let array = Array.from(imgList);
    let altImg = document.querySelector('.lightbox__image').getAttribute('alt');
    let element = array.find(img => img.alt === altImg);
    return {inx: array.indexOf(element), arr: array};
}

// Перелистывание вперёд клавишей

function nextImg() {
    let img = findImg();
    let item = null;
    if (img.inx === img.arr.length - 1) {
        item = img.arr[img.arr.length - 1];
    } else {
        item = img.arr[img.inx + 1];
    }
    setActiveLink(item.getAttribute('data-source'), item.getAttribute('alt'));
}

// Перелистывание назад клавишей

function prevImg() {
    let img = findImg();
    let item = null;
    if (img.inx === 0) {
        item = img.arr[0];
    } else {
        item = img.arr[img.inx - 1];
    }
    setActiveLink(item.getAttribute('data-source'), item.getAttribute('alt'));
}

galleryList.addEventListener('click', handleClick);
closeButton.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && imgLink.classList.contains('is-open')) {
        closeModalButton();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight' && imgLink.classList.contains('is-open')) {
        nextImg();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' && imgLink.classList.contains('is-open')) {
        prevImg();
    }
});
boxOverlay.addEventListener('click', closeModal);