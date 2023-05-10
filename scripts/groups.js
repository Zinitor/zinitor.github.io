// Группы объектов
var groups = [
  {
    name: "Monuments",
    style: "islands#redGlyphIcon",
    icon: "fa-solid fa-monument", //Иконка для фильтра
    items: [
      {
        id: "monument1",
        center: [56.329998, 44.00941],
        name: "Памятник Валерию Павловичу Чкалову",
      },
      {
        id: "monument2",
        center: [56.326796, 44.006875],
        name: "Памятник Кузьме Минину",
      },
      {
        id: "monument3",
        center: [56.313372, 43.990742],
        name: "Памятник Максиму Горькому",
      },
      {
        id: "monument4",
        center: [56.32433, 43.980875],
        name: "Памятник Жюлю Верну",
      },
      {
        id: "monument5",
        center: [56.326026, 43.959518],
        name: "Памятник В. И. Ленину",
      },
      {
        id: "monument6",
        center: [56.23813, 43.95539],
        name: "Громозека",
      },
      {
        id: "monument7",
        center: [56.324251, 44.002154],
        name: "Памятник Н. А. Добролюбову",
      },
    ],
  },
  {
    name: "Churches",
    style: "islands#yellowGlyphIcon",
    icon: "fa-solid fa-cross",
    items: [
      {
        center: [56.323375, 43.987112],
        name: "Храм преподобного Сергия Радонежского",
      },
      {
        center: [56.333719, 43.971365],
        name: "Кафедральный собор во имя Святого Благоверного Князя Александра Невского",
      },
      {
        center: [56.348272, 43.911016],
        name: "Церковь святой равноапостольной Нино, Просветительницы Грузии",
      },
      {
        center: [56.357928, 43.869157],
        name: "Церковь Александра Невского",
      },
      {
        center: [56.349866, 43.872054],
        name: "Спасо-Преображенский собор",
      },
      {
        center: [56.262482, 43.878971],
        name: "Собор Николая Чудотворца",
      },
      {
        center: [56.231229, 44.056883],
        name: "Церковь Преображения Господня в Федяково",
      },
      {
        center: [56.284367, 43.999986],
        name: "Церковь Всех Святых в Марьиной роще",
      },
      {
        center: [56.308588, 44.046821],
        name: "Церковь Живоначальной Троицы",
      },
      {
        center: [56.320278, 43.876647],
        name: "Храм в честь иконы Божией Матери Скоропослушница",
      },
    ],
  },
  {
    name: "ArchLandmarks",
    style: "islands#blueGlyphIcon",
    icon: "fa-solid fa-landmark",
    items: [
      {
        center: [56.328324, 43.961313],
        name: "Нижегородская Ярмарка",
      },
      {
        center: [56.320128, 43.998836],
        name: "Нижегородское отделение Государственного банка",
      },
      {
        center: [56.331006, 44.009474],
        name: "Чкаловская Лестница",
      },
      {
        center: [56.329307, 44.016119],
        name: "Усадьба Рукавишниковых",
      },
      {
        center: [56.3221, 44.012239],
        name: "Нижполиграф",
      },
      {
        center: [56.319774, 43.988972],
        name: "Усадьба купца Маркова",
      },
      {
        center: [56.316589, 44.018841],
        name: "Казённый винный склад",
      },
      {
        center: [56.315011, 43.990823],
        name: "Бывш. училище Императора Александра II",
      },
      {
        center: [56.316873, 43.988667],
        name: "Особняк купца С.А. Иконникова",
      },
    ],
  },
  {
    name: "Граффити",
    style: "islands#greenGlyphIcon",
    icon: "fa-solid fa-spray-can",
    items: [
      {
        center: [56.321796, 44.002043],
        name: "Обновление прошивки",
        author: "Дмитрий Аске",
      },
      {
        center: [56.306373, 43.969542],
        name: "Большой брат",
        author: "Никита Nomerz",
      },
      {
        center: [56.305279, 43.981983],
        name: "На Волге",
        author: "Алексей Kislow",
      },
      {
        center: [56.330725, 43.963478],
        name: "Торговка",
        author: "Кирилл Ведерников",
      },
      {
        center: [56.34265, 43.940975],
        name: "Прятки",
        author: "Basil LST и Dyoma 21",
      },
      {
        center: [56.349769, 43.924204],
        name: "Дворец цветов",
        author: "Анатолий Akue",
      },
      {
        center: [56.328693, 43.954486],
        name: "Счастливая жизнь взаймы",
        author: "Илья Мозги",
      },
      {
        center: [56.322073, 43.95662],
        name: "New world order ver. 1.0",
        author: "Максим Трулов и Ксюша Ласточка",
      },
      {
        center: [56.317867, 44.009544],
        name: "Филворд",
        author: "Владимир Абих",
      },
      {
        center: [56.319973, 44.044416],
        name: "Лесоповал",
        author: "Андрей Оленев",
      },
    ],
  },
];
