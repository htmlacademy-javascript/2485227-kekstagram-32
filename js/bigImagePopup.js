import { isEscapeKey } from './util.js';

const bigPicturePopup = document.querySelector('.big-picture');

const bigPictureImageContainer = document.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageContainer.querySelector('img');
const bigPictureLikes = document.querySelector('.likes-count');
const commentsTotalCounter = document.querySelector('.social__comment-total-count');
const commentsShownCounter = document.querySelector('.social__comment-shown-count');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureDescription = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');

const renderComments = (picture) => {
  commentsList.innerHTML = '';
  const commentFragment = document.createDocumentFragment();

  picture.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;

    commentFragment.append(commentElement);
  });

  commentsList.append(commentFragment);
  commentsTotalCounter.textContent = picture.comments.length;
  commentsShownCounter.textContent = picture.comments.length;
};



const generatePopup = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnail = document.querySelector(`img[src="${picture.url}"]`);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(picture);
      commentsCounter.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    });
  });
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = (picture) => {
  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  renderComments(picture);
  bigPicturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePopup = () => {
  bigPicturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
  });

  document.addEventListener('keydown', onDocumentKeydown);
};



export { generatePopup };


