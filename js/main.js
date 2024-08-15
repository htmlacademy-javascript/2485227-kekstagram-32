import { generateMiniatures } from './miniature.js';
import { generatePopup} from './big-image-popup.js';
import './user-image.js';
import {setUserFormSubmit} from './form-validation.js';
import './user-image-scale.js';
import './user-image-filters.js';
import {getUserPictures, showError, showFormSuccessMessage, showFormErrorMessage} from './api.js';
import {closeUserImagePopup} from './form.js';
import {showFilters} from './thumbnails-filters.js';

setUserFormSubmit(closeUserImagePopup, showFormSuccessMessage, showFormErrorMessage);

getUserPictures()

  .then((pictures) => {
    generateMiniatures(pictures);
    generatePopup(pictures);
    showFilters();
  })
  .catch(() => {
    showError();
  });


