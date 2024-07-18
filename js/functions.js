/* eslint-disable no-unused-vars */
//Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:

const checkStringLength = function (string, maxStringLength) {
  return string.length <= maxStringLength;
};

//цифры

const returnNumbers = function (string) {
  string = string.toString().replace(/\D/g, '');
  return parseInt(string, 10);
};


//Полиндром

const checkIfPalindrom = function (string) {
  string = string.replaceAll(/\s/g, '').toLowerCase();
  const reverseString = string.split().reverse().join();
  return reverseString === string;
};


//Полиндром 2

const checkIfPalindrome = function (string) {
  string = string.replaceAll(/\s/g, '').toLowerCase();

  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString === string;
};

