const PICTURE_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_MIN_COUNT = 0;
const COMMENTS_MAX_COUNT = 30;
const AVATAR_MIN_COUNT = 1;
const AVATAR_MAX_COUNT = 6;
const MESSAGES_MIN_COUNT = 1;
const MESSAGES_MAX_COUNT = 2;

const DESCRIPTIONS = [
  "Закатное солнце окрашивает небо и облака в ярко-оранжевые и розовые тона, отражаясь в тихой глади моря.",
  "Старый деревянный мост, ведущий через густой лес, покрытый яркой осенней листвой.",
  "Группа радостных детей запускает воздушных змеев на зеленом лугу под голубым небом.",
  "Горный хребет, окутанный утренним туманом, с заснеженными вершинами и ярким солнцем на горизонте.",
  "Очаровательный котенок с большими голубыми глазами, играющий с клубком ниток на ковре.",
  "Вечерний городской пейзаж с ярко освещенными небоскребами, отражающимися в реке.",
  "Цветущий сад с разноцветными тюльпанами и нарциссами, окруженный зелеными деревьями.",
  "Семья, собравшаяся вокруг костра на пляже, жарит маршмэллоу под звездами.",
  "Пара сидит на скамейке в парке, обнимаясь и наблюдая за утками в пруду.",
  "Уличный музыкант играет на гитаре в оживленной пешеходной зоне, вокруг собралась небольшая толпа слушателей.",
  "Величественный замок на вершине холма, окруженный туманом, с видом на бескрайние поля.",
  "Собака весело прыгает через поле подсолнухов под ясным голубым небом.",
  "Художник рисует пейзаж на холсте, сидя у реки в солнечный день.",
  "Вечеринка на крыше дома с видом на ночной город, столы накрыты едой и напитками, люди танцуют и улыбаются.",
  "Стрекоза сидит на лепестке цветка, сверкающем капельками росы.",
  "Спокойный сельский пейзаж с деревянной избой, окруженной зелеными лугами и пасущимися коровами.",
  "Горячий эспрессо в белой чашке на столе рядом с открытой книгой и свежими круассанами.",
  "Широкая улица старинного европейского города с каменными мостовыми и цветущими балконами.",
  "Яхты, стоящие на якоре в живописной гавани на фоне закатного неба.",
  "Портрет улыбающейся девушки с венком из полевых цветов на голове.",
  "Водопад, низвергающийся с высокой скалы в окружении густого леса и пышной растительности.",
  "Пикник на лужайке: плед, корзина с едой, свежие фрукты и бутерброды.",
  "Ароматный букет лаванды, лежащий на деревянном столе в лучах утреннего солнца.",
  "Забавный снежный человек, которого лепят дети на зимней улице, снежинки падают вокруг.",
  "Поляна с маками, раскачивающимися на ветру под лазурным небом и легкими облаками.",
];
const COMMENT_LINES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];
const NAMES = [
  "Зефирий",
  "Карамелла",
  "Пломбирий",
  "Фантазия",
  "Пузырёк",
  "Мармеладия",
  "Тортик",
  "Веселинка",
  "Смешарий",
  "Бублика",
  "Конфетти",
  "Ромашкин",
  "Леденцовый",
  "Вишенка",
  "Кексик",
  "Виноградинка",
  "Барбариска",
  "Пончик",
  "Чипсик",
  "Фисташка",
  "Крендель",
  "Кукурузкин",
  "Шоколадка",
  "Желея",
  "Сиропчик",
];
const getRandomInteger = (a, b) => {
  const lower = Math.ceil (Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];


const createIdGenerator = () => {
  let numberId = 0;
  return () => {
    numberId += 1;
    return numberId;

  };
};
const generateRandomId = createIdGenerator();
const createMessage = () => Array.from(
  {length: getRandomInteger(MESSAGES_MIN_COUNT, MESSAGES_MAX_COUNT)},
  () => getRandomArrayElement(COMMENT_LINES)
);


const createComment = () => ({
  id: generateRandomId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_COUNT, AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});


const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from(
    {length: getRandomInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT)},
    () => createComment()
  )
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, index) => createPicture(index + 1)
);

getPictures();

console.log(getPictures());
