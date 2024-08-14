import { isEscapeKey } from './util.js';
import {removeScaleListeners, addScaleListeners} from './userImageScale.js';
import {pristine} from './formValidation.js';
import {resetFilters} from './userImageFilters.js';
import {resetScale} from './userImageScale.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const uploadImageOverlay = form.querySelector('.img-upload__overlay');
const uploadImageInput = form.querySelector('.img-upload__input');
const previewCloseButton = document.querySelector('.img-upload__cancel');
const hashtags = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');


const generateUserImagePopup = function () {
  uploadImageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  addScaleListeners();
  previewCloseButton.addEventListener('click', onClosePopupButton);
  document.addEventListener('keydown', onDocumentKeydown);

};
const onImageUpload = function () {
  generateUserImagePopup();
};
uploadImageInput.addEventListener('change', onImageUpload);


//закрытие попапа
const closeUserImagePopup = function () {
  uploadImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFilters();
  resetScale();
  removeScaleListeners();
  form.reset();
  pristine.reset();
  previewCloseButton.removeEventListener('click', onClosePopupButton);

};


const isFocused = function (element) {
  return document.activeElement === element;
};

const onClosePopupButton = function (evt) {
  evt.preventDefault();
  closeUserImagePopup();


};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!isFocused(hashtags) || !isFocused(comments)) {
      closeUserImagePopup();
    } else {
      evt.stopPropagation();
    }
  }
};
export {closeUserImagePopup, onDocumentKeydown};
