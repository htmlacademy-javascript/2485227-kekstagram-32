import {isEscapeKey} from './util.js';
import {getPictures} from './data.js';


// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:


//пример

//<li class="social__comment">
//  <img
//    class="social__picture"
//    src="{{аватар}}"
//    alt="{{имя комментатора}}"
//    width="35" height="35">
//  <p class="social__text">{{текст комментария}}</p>
//</li>



const bigPicturePopup = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const thumbnails = pictures.getElementsByClassName('picture');
const bigPictureImageContainer = document.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageContainer.querySelector('img');
const bigPictureLikes = document.querySelector('.likes-count');
const commentsTotalCounter = document.querySelector('.social__comment-total-count');
const commentsShownCounter = document.querySelector('.social__comment-shown-count');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel ');
const bigPictureDescription = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');




const generatePopup = function (thumbnail) {
  bigPictureImage.src = thumbnail.querySelector('.picture__img').src;
  bigPictureLikes.textContent = thumbnail.querySelector('.picture__likes').textContent;
  commentsTotalCounter.textContent = thumbnail.querySelector('.picture__comments').textContent;
  commentsShownCounter.textContent = bigPicturePopup.querySelectorAll('.social__comment').length;

  //renderComments(thumbnail);

  bigPictureDescription.textContent = thumbnail.querySelector('.picture__img').alt;

};


const renderComments = () => {

  const commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  commentTemplate.cloneNode(true);

  commentsList.appendChild(commentFragment);
};

console.log(renderComments());


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

//открывает попап
const openPopup = function() {
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      generatePopup(thumbnails[i]);
      bigPicturePopup.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
    });
  }
};


//закрывает попап
const closePopup = function() {
  bigPicturePopup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

const popupHandler = function () {
  openPopup();
  closePopup();
};


export {popupHandler};
