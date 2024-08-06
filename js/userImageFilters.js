const slider = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview');
const changeFilterButtons = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');

noUiSlider.create(slider, {
  start: [100],
  connect: 'lower',
  range: {
    min: 0,
    max: 100
  }
});


const filters = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
  none: { filter: 'none', min: 0, max: 100, step: 1, unit: '' }
};

//filters
changeFilterButtons.forEach((button) => {
  button.addEventListener('change', onFilterButtonChange);
});

//при нажатии на фильтр
function onFilterButtonChange(event) {
  const selectedFilter = event.target.value;
  const filterConfig = filters[selectedFilter];
  slider.noUiSlider.reset();
  if (filterConfig) {
    slider.noUiSlider.updateOptions({
      start: [filterConfig.max],
      range: {
        'min': filterConfig.min,
        'max': filterConfig.max
      },
      step: filterConfig.step
    });

    applyFilter(selectedFilter, filterConfig.max);
  }
}


function onSliderValueChange() {
  const selectedFilter = document.querySelector('.effects__radio:checked').value;
  const filterConfig = filters[selectedFilter];
  const sliderValue = slider.noUiSlider.get();
  effectValue.value = sliderValue;
  if (filterConfig && filterConfig.filter !== 'none') {
    applyFilter(selectedFilter, sliderValue);
  } else {
    imagePreview.style.filter = 'none';
  }
}

function applyFilter(filterName, value) {
  const filterConfig = filters[filterName];

  if (filterConfig.filter !== 'none') {
    sliderContainer.classList.remove('hidden');
    imagePreview.style.filter = `${filterConfig.filter}(${value}${filterConfig.unit})`;
  } else {
    imagePreview.style.filter = 'none';
    sliderContainer.classList.add('hidden');
  }
}

slider.noUiSlider.on('update', onSliderValueChange);
