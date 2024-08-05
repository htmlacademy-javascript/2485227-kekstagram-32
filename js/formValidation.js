const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENTS_LENGTH = 140;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег' ,
  INVALID_LENGTH: 'Максимальная длина комментария 140 символов'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});


const parseHashtags = (value) => value.trim().split(/\s+/);

const hasUniqueTags = (value) => {
  const hashtags = parseHashtags(value);
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidNumber = (value) => parseHashtags(value).length <= MAX_HASHTAG_COUNT;

const hasValidTags = (value) => parseHashtags(value).every((tag) => HASHTAG_SYMBOLS.test(tag));

const hasValidLength = (value) => value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator (
  hashtagsInput,
  hasValidNumber,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator (
  hashtagsInput,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator (
  hashtagsInput,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

pristine.addValidator (
  comments,
  hasValidLength,
  ErrorText.INVALID_LENGTH,
  1,
  true
);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
