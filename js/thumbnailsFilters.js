import { generateMiniatures } from './miniature.js';
import { pictures } from './main.js';
import { generatePopup } from './bigImagePopup.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const RANDOM_PICTURE_COUNT = 10;
const filtersSection = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

const getRandomPictures = function (pictures) {
  const filteredPictures = pictures.slice();
  const shuffled = [...filteredPictures].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, RANDOM_PICTURE_COUNT);
};

const getDiscussedPictures = function (pictures) {
  const filteredPictures = pictures.slice();
  return [...filteredPictures].sort((a, b) => b.comments.length - a.comments.length);
};


const applyFilter = function (pictures, filterName) {

  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });
  let filteredPictures = pictures;
  if (filterName === 'filter-default') {
    filteredPictures = pictures;
  } else if (filterName === 'filter-random') {
    filteredPictures = getRandomPictures(pictures);
  } else if (filterName === 'filter-discussed') {
    filteredPictures = getDiscussedPictures(pictures);
  }
  generateMiniatures(filteredPictures);
  generatePopup(filteredPictures);
};


const showFilters = function() {
  filtersSection.classList.remove('img-filters--inactive');
};

const debouncedApplyFilter = debounce(applyFilter, RERENDER_DELAY);

const onFilterClick = function (evt) {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
  const filterName = evt.target.id;

  debouncedApplyFilter(pictures, filterName);
};

filtersForm.addEventListener('click', onFilterClick);


export {showFilters, applyFilter};
