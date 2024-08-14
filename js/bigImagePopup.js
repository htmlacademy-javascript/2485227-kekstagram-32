import { isEscapeKey } from './util.js';

const MAX_SHOWN_COMMENTS = 5;
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


//подгрузка комментариев
const hideComments = function () {
  if (comments.length > MAX_SHOWN_COMMENTS) {
    for (let i = MAX_SHOWN_COMMENTS; i < comments.length; i++) {
      comments[i].classList.add('hidden');
    }
  }
};

//после определенного количества кликов по кнопке происходит(TypeError: undefined is not an object (evaluating 'hiddenComments[i].classList')) и комментарии начинают подгружаться по 1-2-3 штуки
const loadMoreComments = function () {
  const remainingItems = Math.min(MAX_SHOWN_COMMENTS, hiddenComments.length);
  for (let i = 0; i < remainingItems; i++) {
    hiddenComments[i].classList.remove('hidden');
    commentsShownCounter.textContent = comments.length - hiddenComments.length;
  }
  if (hiddenComments.length === 0) {
    commentsLoaderButton.classList.add('hidden');
  }
};


const onLoadCommentsButton = () => {
  loadMoreComments();
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

  hideComments(MAX_SHOWN_COMMENTS);
  if (hiddenComments.length === 0) {
    commentsLoaderButton.classList.add('hidden');
  }
  commentsTotalCounter.textContent = picture.comments.length;
  commentsShownCounter.textContent = comments.length - hiddenComments.length;
<<<<<<< Updated upstream
  commentsLoaderButton.classList.remove('hidden');
=======
  if (commentsList.getElementsByClassName('hidden').length !== 0) {
    commentsLoaderButton.classList.remove('hidden');
  }
>>>>>>> Stashed changes
  commentsLoaderButton.addEventListener('click', onLoadCommentsButton);

};

//открытие и закрытие


const closePopup = () => {
  bigPicturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.removeEventListener('click', onLoadCommentsButton);
  document.removeEventListener('click', onClosePopupButton);
  bigPictureCloseButton.removeEventListener('click', onClosePopupButton);
};


const openPopup = (picture) => {
  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  renderComments(picture);
  bigPicturePopup.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('click', onClosePopupButton);
  document.addEventListener('keydown', onDocumentKeydown);

};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onClosePopupButton = () => {
  bigPictureCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
  });
};


const generatePopup = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnail = document.querySelector(`img[src="${picture.url}"]`);
    thumbnail.addEventListener('click', () => {
      openPopup(picture);

    });
  });
};


export {generatePopup};


