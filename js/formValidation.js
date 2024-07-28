import '../vendor/pristine/pristine.min.js';


const body = document.body;
const form = document.querySelector('.img-upload__form');
const uploadImageInput = form.querySelector('.img-upload__input');
const uploadImageOverlay = form.querySelector('.img-upload__overlay');
const previewImageContainer = document.querySelector('.img-upload__preview');
const previewImage = previewImageContainer.querySelector('img');
const previewCloseButton = document.querySelector('.img-upload__cancel');
const filterInputs = form.querySelectorAll('.effects__radio');
const hashtagsInput = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');

const hashtagRequirements = /^#[a-zа-яё0-9]{1,19}$/i;

//hashtags
const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

pristine.addValidator(hashtagsInput, validateHashtags, 'Хэштеги должны начинаться с # и содержать от 1 до 20 символов');

pristine.addValidator(comments, validateComment, 'Комментарий не может содержать больше 140 символов');




form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const hashtagsCheck = pristine.validate();
  if (hashtagsCheck && validateComment) {
    console.log('Форма валидна!');
  } else {
    console.log('Форма невалидна!');
  }

});


function validateHashtags (value) {
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) {
    return false;
  }
  const lowerCaseTags = hashtags.map(tag => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  if (uniqueTags.size !== hashtags.length) {
    return false;
  }
  return hashtags.every(tag => hashtagRequirements.test(tag));
}

function validateComment(value) {
  return value.length <= 140;
}
