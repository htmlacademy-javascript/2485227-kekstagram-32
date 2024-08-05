import { getPictures } from './data.js';
import { generateMiniatures } from './miniature.js';
import { generatePopup } from './bigImagePopup.js';
import './form.js';
import './userImageScale.js';
import './userImageFilters.js';

const pictures = getPictures();

generateMiniatures(pictures);

generatePopup(pictures);

