
const miniatureTemplate = document.querySelector('#picture').content;
const miniaturesContainer = document.querySelector('.pictures');

const createMiniature = function (picture) {
  const miniatureElement = miniatureTemplate.cloneNode(true);

  let imageElement = miniatureElement.querySelector('.picture__img');
  let imageCommentsNumber = miniatureElement.querySelector('.picture__comments');
  let imageLikes = miniatureElement.querySelector('.picture__likes');

imageElement.src = picture.url;
imageElement.alt = picture.description;
imageCommentsNumber.textContent = picture.comments.length;
imageLikes.textContent = picture.likes;

  return miniatureElement;
};

const generateMiniatures = function (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    fragment.append(miniature);
});

  miniaturesContainer.appendChild(fragment);
};


export {generateMiniatures};
