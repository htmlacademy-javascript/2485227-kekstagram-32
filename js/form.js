import { isEscapeKey } from './util.js';

import {removeScaleListeners} from './userImageScale.js';
import {resetFilters} from './userImageFilters.js';
import {resetScale} from './userImageScale.js';
import {pristine} from './formValidation.js';

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
  previewCloseButton.addEventListener('click', onClosePopupButton);
  document.addEventListener('keydown', onDocumentKeydown);
};
uploadImageInput.addEventListener('change', onImageUpload);


//по изменению поля рисуется и показывается модалка


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
  document.removeEventListener('keydown', onDocumentKeydown);
  removeScaleListeners();
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
    if (isFocused(hashtags) || isFocused(comments)) {
      evt.stopPropagation();

    } else {
      closeUserImagePopup();
    }

  }
};
export {closeUserImagePopup};
