const getUserPictures = () =>
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then ((response) => response.json());


const sendFormData = (body) => fetch(
  'https://32.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });

export {getUserPictures, sendFormData};
