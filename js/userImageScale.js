const step = 25;
const maxValue = 100;
const minValue = 25;
const defaultValue = 100;
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

//scale

scaleInput.value = `${defaultValue}%`;

const onScaleValueChange = function () {
  const scaleValue = parseInt(scaleInput.value, 10);
  if (scaleValue >= minValue && scaleValue <= maxValue) {
    imagePreview.style.transform = `scale(${scaleValue / 100})`;
  }
};

const onScaleDownButton = function () {
  const currentValue = parseInt(scaleInput.value, 10);
  if (currentValue > minValue) {
    scaleInput.value = `${currentValue - step}%`;
    onScaleValueChange();
  }
};

const onScaleUpButton = function () {
  const currentValue = parseInt(scaleInput.value, 10);
  if (currentValue < maxValue) {
    scaleInput.value = `${currentValue + step}%`;
    onScaleValueChange();
  }
};

//event listeners
scaleInput.addEventListener('change', onScaleValueChange);
scaleDownButton.addEventListener('click', onScaleDownButton);
scaleUpButton.addEventListener('click', onScaleUpButton);


const removeScaleListeners = function () {
  scaleInput.removeEventListener('change', onScaleValueChange);
  scaleDownButton.removeEventListener('click', onScaleDownButton);
  scaleUpButton.removeEventListener('click', onScaleUpButton);
};


onScaleValueChange();

export {removeScaleListeners};


