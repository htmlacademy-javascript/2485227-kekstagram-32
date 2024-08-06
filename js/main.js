import { generateMiniatures } from './miniature.js';
import { generatePopup} from './bigImagePopup.js';
import {setUserFormSubmit} from './formValidation.js';
import './userImageScale.js';
import './userImageFilters.js';
import {getUserPictures, sendFormData} from './api.js';
import {closeUserImagePopup} from './form.js';

getUserPictures()
  .then((pictures) => {
    generateMiniatures(pictures);
    generatePopup(pictures);
  });
setUserFormSubmit(closeUserImagePopup);
