//Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:

let checkStringLength = function (string, maxStringLength) {
  return string.length <= maxStringLength;
};

console.log(checkStringLength("проверяемая строка", 20));

//цифры

let returnNumbers = function (string) {
  string = string.toString().replace(/\D/g, "");
  return parseInt(string, 10);
};

console.log(returnNumbers("2023 год")); // 2023
console.log(returnNumbers("ECMAScript 2022")); // 2022
console.log(returnNumbers("1 кефир, 0.5 батона")); // 105
console.log(returnNumbers("агент 007")); // 7
console.log(returnNumbers("а я томат"));

console.log(returnNumbers(2023));
console.log(returnNumbers(-1));
console.log(returnNumbers(1.5));

//Полиндром

let checkIfPalindrom = function (string) {
  string = string.replaceAll(/\s/g, "").toLowerCase();
  let reverseString = string.split().reverse().join();
  return reverseString === string;
};

console.log(checkIfPalindrom("проверяемая строка"));

//Полиндром 2

let checkIfPalindrome = function (string) {
  string = string.replaceAll(/\s/g, "").toLowerCase();
  console.log(string);

  let reversedString = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString === string;
};

console.log(checkIfPalindrome("проверяемая строка"));
