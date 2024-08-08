const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadImageInput = form.querySelector('.img-upload__input');
const previewImageContainer = document.querySelector('.img-upload__preview');
const previewImage = previewImageContainer.querySelector('img');
const effectsPreviewThumbnails = document.querySelectorAll('.effects__preview');

const onImageUpload = function (evt) {
  evt.preventDefault();
  const uploadedImage = uploadImageInput.files[0];
  const imageUrl = URL.createObjectURL(uploadedImage);
  effectsPreviewThumbnails.forEach((thumbnail) => {
    thumbnail.style.backgroundImage = `url(${imageUrl})`;
  });

  const fileName = uploadedImage.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImage.src = URL.createObjectURL(uploadedImage);
  }
};

uploadImageInput.addEventListener('change', onImageUpload);



