import { isEscapeKey } from './util.js';

import {removeScaleListeners} from './userImageScale.js';


const body = document.body;
const form = document.querySelector('.img-upload__form');
const uploadImageInput = form.querySelector('.img-upload__input');
const uploadImageOverlay = form.querySelector('.img-upload__overlay');
const previewImageContainer = document.querySelector('.img-upload__preview');
const previewImage = previewImageContainer.querySelector('img');
const previewCloseButton = document.querySelector('.img-upload__cancel');
const hashtags = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');


const generateUserImagePopup = function () {
//заполняет данные
  const uploadedImage = uploadImageInput.files[0];
  previewImage.src = URL.createObjectURL(uploadedImage);
  //показывает
  uploadImageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  previewCloseButton.addEventListener('click', onClosePopupButton);
  document.addEventListener('keydown', onDocumentKeydown);
};


const onImageUpload = function (evt) {
  evt.preventDefault();
  generateUserImagePopup();
};

// по изменению
uploadImageInput.addEventListener('change', onImageUpload);

//по изменению поля рисуется и показывается модалка


//закрытие попапа
const closeUserImagePopup = function () {
  uploadImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  previewCloseButton.removeEventListener('click', onClosePopupButton);
  document.removeEventListener('keydown', onDocumentKeydown);
  removeScaleListeners();
};



const isFocused = function (element) {
  return document.activeElement === element;
};

const onClosePopupButton = function (evt) {
  evt.preventDefault();
  closeUserImagePopup();
  form.reset();

};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (isFocused(hashtags) || isFocused(comments)) {
      evt.stopPropagation();

    } else {
      closeUserImagePopup();
    }

  }
};
export {closeUserImagePopup};
