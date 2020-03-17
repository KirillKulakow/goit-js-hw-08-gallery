import {default as gallery} from './gallery-items.js'

let galleryList = document.querySelector('.gallery');
let img = document.querySelector('.lightbox__image');
let imgLink = document.querySelector('.js-lightbox');
let closeButton = document.querySelector('.lightbox__button');
let boxOverlay = document.querySelector('.lightbox__overlay');


// Разметка библиотеки/галереи

let elementsGallery = [];
gallery.forEach(function(item) {
    let liItem = document.createElement('li');
    let link = document.createElement('a');
    let image = document.createElement('img');
    liItem.setAttribute('class', 'gallery__item');
    link.setAttribute('class', 'gallery__link');
    link.setAttribute('href', item.original);
    image.setAttribute('class', 'gallery__image');
    image.setAttribute('src', item.preview);
    image.setAttribute('data-source', item.original);
    image.setAttribute('alt', item.description);
    link.appendChild(image);
    liItem.appendChild(link);
    elementsGallery.push(liItem);
})
elementsGallery = elementsGallery.map(function (el){
    return el.outerHTML;
});
galleryList.insertAdjacentHTML('beforeend', elementsGallery.join(''));

let imgList = document.querySelectorAll('.gallery__image')

// Делегирование на ul

function handleClick (e) {
    e.preventDefault();
    const target = e.target;
    setActiveLink(target.getAttribute('data-source'), target.getAttribute('alt'));
};

// Передача src и alt в модальное окно

function setActiveLink (activeLink, alt) {
    img.setAttribute('src', activeLink);
    img.setAttribute('alt', alt);
    if (!imgLink.classList.contains('is-open')) {openModal()}
}

// Открытие модального окна

function openModal () {
    imgLink.classList.add('is-open');
}

// Закрытие модального окна клик

function closeModal (e) {
    if (e.target.nodeName === 'IMG') {return}
    let modal = document.querySelector('.lightbox');
    modal.classList.remove('is-open');
    img.setAttribute('src', '');
    img.setAttribute('alt', '');
}

// Закрытие модального окна Esc

function closeModalButton (e) {
    let modal = document.querySelector('.lightbox');
    modal.classList.remove('is-open');
    img.setAttribute('src', '');
    img.setAttribute('alt', '');
}

// Перелистывание вперёд клавишей

function nextImg () {
    let item = null;
    imgList.forEach(function(el, index, array) {
        let altImg = document.querySelector('.lightbox__image').getAttribute('alt');
        if (el.alt === altImg) {
            if (index === array.length - 1) {
                return item = array[array.length - 1];
            }
            item = array[index + 1];
        }
        })
    setActiveLink(item.getAttribute('data-source'), item.getAttribute('alt'))
}

// Перелистывание назад клавишей

function prevImg () {
    let item = null;
    imgList.forEach(function(el, index, array) {
        let altImg = document.querySelector('.lightbox__image').getAttribute('alt');
        if (el.alt === altImg) {
            if (index === 0) {
                return item = array[0];
            }
            item = array[index - 1];
        }
        }) 
    setActiveLink(item.getAttribute('data-source'), item.getAttribute('alt'))
}

galleryList.addEventListener('click', handleClick)
closeButton.addEventListener('click', closeModal)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape' && imgLink.classList.contains('is-open'))  {
        closeModalButton ()
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowRight' && imgLink.classList.contains('is-open'))  {
        nextImg ()
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft' && imgLink.classList.contains('is-open'))  {
        prevImg ()
    }
  });
boxOverlay.addEventListener('click', closeModal)



