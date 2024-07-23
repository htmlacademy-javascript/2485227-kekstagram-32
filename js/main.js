import { getPictures } from './data.js';
import { generateMiniatures } from './miniature.js';
import {  generatePopup } from './bigImagePopup.js';

const pictures = getPictures();

generateMiniatures(pictures);

generatePopup(pictures);
