import { isEscapeKey } from './util.js';
import './formValidation.js';
import {removeScaleListeners} from './userImageScale.js';


const body = document.body;
const form = document.querySelector('.img-upload__form');
const uploadImageInput = form.querySelector('.img-upload__input');
const uploadImageOverlay = form.querySelector('.img-upload__overlay');
const previewImageContainer = document.querySelector('.img-upload__preview');
const previewImage = previewImageContainer.querySelector('img');
const previewCloseButton = document.querySelector('.img-upload__cancel');
const filterInputs = form.querySelectorAll('.effects__radio');
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
  comments.addEventListener('keydown', onHashtagsFocus);
  comments.addEventListener('keydown', onCommentsFocus);
};

const onClosePopupButton = function (evt) {
  evt.preventDefault();
  closeUserImagePopup();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserImagePopup();
  }
};

hashtags.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});


const onHashtagsFocus = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

const onCommentsFocus = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

// по изменению инпута
const openUserImagePopup = function () {
  uploadImageInput.addEventListener('change', onImageUpload);
};

//по изменению поля рисуется и показывается модалка
const onImageUpload = function (evt) {
  evt.preventDefault();
  generateUserImagePopup();
};

//ресетит все поля
const formInputReset = function () {
  uploadImageInput.value = '';
  filterInputs.value = '';
  hashtags.value = '';
  comments.value = '';
};

//закрытие попапа
const closeUserImagePopup = function () {
  uploadImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formInputReset();
  previewCloseButton.removeEventListener('click', onClosePopupButton);
  document.removeEventListener('keydown', onDocumentKeydown);
  comments.removeEventListener('keydown', onHashtagsFocus);
  comments.removeEventListener('keydown', onCommentsFocus);
  removeScaleListeners();
};


openUserImagePopup();
