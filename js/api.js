import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './form.js';
const TIME_OUT = 5000;

const formSuccessMessageTemplate = document.querySelector('#success');
const formErrorMessageTemplate = document.querySelector('#error');

const showFormSuccessMessage = function () {
  const successMessage = formSuccessMessageTemplate.content.cloneNode(true);
  document.body.appendChild(successMessage);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessMessageButton);
  document.addEventListener('keydown', onSuccessDocumentKeydown);
  document.addEventListener('click', onSuccessOutsideClick);

};


const closeFormSuccessMessage = function () {
  const successMessageSection = document.querySelector('.success');
  document.body.removeChild(successMessageSection);
  document.removeEventListener('keydown', onSuccessDocumentKeydown);
  document.removeEventListener('click', onSuccessOutsideClick);
};

const onSuccessOutsideClick = (evt) => {
  const successMessage = document.querySelector('.success__inner');
  if (successMessage && !successMessage.contains(evt.target)) {
    closeFormSuccessMessage();
  }
};

const onSuccessDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormSuccessMessage();
  }
};
const onSuccessMessageButton = function (evt) {
  evt.preventDefault();
  closeFormSuccessMessage();
};


const showFormErrorMessage = function () {
  document.removeEventListener('keydown', onDocumentKeydown);
  const formErrorMessage = formErrorMessageTemplate.content.cloneNode(true);
  document.body.appendChild(formErrorMessage);
  const formErrorButton = document.querySelector('.error__button');
  formErrorButton.addEventListener('click', onFormErrorButton);
  document.addEventListener('keydown', onErrorDocumentKeydown);
  document.addEventListener('click', onErrorOutsideClick);
};

const closeFormErrorMessage = function () {
  const formErrorMessageSection = document.querySelector('.error');
  document.body.removeChild(formErrorMessageSection);
  document.removeEventListener('keydown', onErrorDocumentKeydown);
  document.removeEventListener('click', onErrorOutsideClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onErrorOutsideClick = (evt) => {
  const formErrorMessage = document.querySelector('.error__inner');
  if (formErrorMessage && !formErrorMessage.contains(evt.target)) {
    closeFormErrorMessage();
  }
};

const onErrorDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormErrorMessage();
  }
};
const onFormErrorButton = function (evt) {
  evt.preventDefault();
  closeFormErrorMessage();
};


const showError = function () {
  const template = document.querySelector('#data-error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);
  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    document.body.removeChild(errorMessage);
  }, TIME_OUT);
};


const getUserPictures = () =>
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showError();
    });


const sendFormData = (body) => fetch(
  'https://32.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  });


export {getUserPictures, sendFormData, showError, showFormSuccessMessage, showFormErrorMessage};
