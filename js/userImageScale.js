const STEP = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;
const DEFAULT_VALUE = 100;
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imagePreviewContainer = document.querySelector('.img-upload__preview');
const imagePreview = imagePreviewContainer.getElementsByTagName('img');

scaleInput.value = `${DEFAULT_VALUE}%`;

const onScaleValueChange = function () {

  const scaleValue = parseInt(scaleInput.value, 10);
  if (scaleValue >= MIN_VALUE && scaleValue <= MAX_VALUE) {
    imagePreview[0].style.transform = `scale(${scaleValue / 100})`;
  }
};

const onScaleDownButton = function () {
  const currentValue = parseInt(scaleInput.value, 10);
  if (currentValue > MIN_VALUE) {
    scaleInput.value = `${currentValue - STEP}%`;
    onScaleValueChange();
  }
};

const onScaleUpButton = function () {
  const currentValue = parseInt(scaleInput.value, 10);
  if (currentValue < MAX_VALUE) {
    scaleInput.value = `${currentValue + STEP}%`;
    onScaleValueChange();
  }
};

const addScaleListeners = function () {
  scaleInput.addEventListener('change', onScaleValueChange);
  scaleDownButton.addEventListener('click', onScaleDownButton);
  scaleUpButton.addEventListener('click', onScaleUpButton);
};

//event listeners

const removeScaleListeners = function () {
  scaleInput.removeEventListener('change', onScaleValueChange);
  scaleDownButton.removeEventListener('click', onScaleDownButton);
  scaleUpButton.removeEventListener('click', onScaleUpButton);
};
const resetScale = function () {
  scaleInput.value = `${DEFAULT_VALUE}%`;
  imagePreview[0].style.transform = `scale(${DEFAULT_VALUE}%)`;
};


onScaleValueChange();

export {removeScaleListeners, resetScale, addScaleListeners};


