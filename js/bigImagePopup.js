//найти кнопки и попап. навесить слушатели. по клику вешать и снимать класс hidden у .big-picture.
// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

// Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.

// Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:


//пример

//<li class="social__comment">
//  <img
//    class="social__picture"
//    src="{{аватар}}"
//    alt="{{имя комментатора}}"
//    width="35" height="35">
//  <p class="social__text">{{текст комментария}}</p>
//</li>

// Описание фотографии description вставьте строкой в блок .social__caption.

const bigPicturePopup = document.querySelector('.big-picture');
const thumbnails = document.getElementsByClassName('picture');
const bigPicture = document.querySelector('.big-picture__img');

const likes = document.querySelector('.likes-count');
const commentsTotalCounter = document.querySelector('.social__comment-total-count');
const commentsShownCounter = document.querySelector('.social__comment-shown-count');


const openPopup = function(popup){

  thumbnails.addEventListener('click', function (evt) {
    popup = bigPicturePopup;
    popup.classList.remove('hidden');
  });

};

openPopup();

const closeBigPicture = function(){
  bigPicturePopup.classList.add('hidden');
};

