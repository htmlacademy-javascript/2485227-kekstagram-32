import { isEscapeKey } from './util.js';

const maxShownComments = 5;
const bigPicturePopup = document.querySelector('.big-picture');

const bigPictureImageContainer = document.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageContainer.querySelector('img');
const bigPictureLikes = document.querySelector('.likes-count');
const commentsTotalCounter = document.querySelector('.social__comment-total-count');
const commentsShownCounter = document.querySelector('.social__comment-shown-count');

const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureDescription = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const comments = commentsList.getElementsByClassName('social__comment');
const hiddenComments = commentsList.getElementsByClassName('social__comment hidden');
const commentsLoaderButton = document.querySelector('.social__comments-loader');

const hideComments = function (maxShownComments) {
  if (comments.length > maxShownComments) {
    for (let i = maxShownComments; i < comments.length; i++) {
      comments[i - 1].classList.add('hidden');
    }
  }

};

const loadMoreComments = function () {
  let visibleCount = 5;
  for (let i = 0; i < maxShownComments && i < hiddenComments.length; i++) {
    hiddenComments[i].classList.remove('hidden');
  }

  visibleCount += maxShownComments;
  commentsShownCounter.textContent = comments.length - hiddenComments.length;
};


const showComments = function () {
  commentsLoaderButton.addEventListener('click', () => {
    loadMoreComments();

  });

};


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
  hideComments(maxShownComments);
  commentsTotalCounter.textContent = picture.comments.length;
  commentsShownCounter.textContent = comments.length - hiddenComments.length;
  showComments();
};


const generatePopup = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnail = document.querySelector(`img[src="${picture.url}"]`);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(picture);

    });
  });
  closePopup();
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


