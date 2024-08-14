import { generateMiniatures } from './miniature.js';
import { generatePopup} from './bigImagePopup.js';
import './userImage.js';
import {setUserFormSubmit} from './formValidation.js';
import './userImageScale.js';
import './userImageFilters.js';
import {getUserPictures, showError, showFormSuccessMessage, showFormErrorMessage} from './api.js';
import {closeUserImagePopup} from './form.js';
import {showFilters} from './thumbnailsFilters.js';
import './thumbnailsFilters.js';

let pictures = [];

getUserPictures()

  .then((data) => {
    pictures = data;
    showFilters();
    generateMiniatures(pictures);
    generatePopup(pictures);

  })
  .catch(() => {
    showError();
  });


setUserFormSubmit(closeUserImagePopup, showFormSuccessMessage, showFormErrorMessage);

const getPictures = () => pictures;

export { getPictures };
