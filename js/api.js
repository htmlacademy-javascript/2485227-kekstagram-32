import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './form.js';
const TIME_OUT = 5000;
const postUrl = 'https://32.javascript.htmlacademy.pro/kekstagram/';
const getUrl = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
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

function onSuccessOutsideClick (evt) {
  const successMessage = document.querySelector('.success__inner');
  if (successMessage && !successMessage.contains(evt.target)) {
    closeFormSuccessMessage();
  }
}

function onSuccessDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormSuccessMessage();
  }
}

function onSuccessMessageButton (evt) {
  evt.preventDefault();
  closeFormSuccessMessage();
}


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

function onErrorOutsideClick (evt) {
  const formErrorMessage = document.querySelector('.error__inner');
  if (formErrorMessage && !formErrorMessage.contains(evt.target)) {
    closeFormErrorMessage();
  }
}

function onErrorDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormErrorMessage();
  }
}

function onFormErrorButton (evt) {
  evt.preventDefault();
  closeFormErrorMessage();
}


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
  fetch(getUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showError();
    });


const sendFormData = (formData) => fetch(
  postUrl,
  {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

export {getUserPictures, sendFormData, showError, showFormSuccessMessage, showFormErrorMessage};
