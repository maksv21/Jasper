export const dict = {
  /* header */
  search: (params) => params === 'action' ? 'Искать питомца' : 'Поиск',
  about: 'Про проект',
  contacts: 'Контакты',
  delivery: 'Доставка',
  help: 'Помощь',
  /* goods */
  years: (n) => formatCounter(n, 'лет', 'год', 'года'),
  months: (n) => formatCounter(n, 'месяцев', 'месяц', 'месяца'),
  weeks: (n) => formatCounter(n, 'недель', 'неделя', 'недели'),
  days: (n) => formatCounter(n, 'дней', 'день', 'дня'),
  male: 'Мальчик',
  female: 'Девочка',
  /*product details*/
  age: 'Возраст',
  /*sorting*/
  sort_by: 'Сортировать',
  'price-high': 'Цена — по убыванию',
  'price-low': 'Цена — по возрастанию',
  'age-high': 'Возраст — по убыванию',
  'age-low': 'Возраст — по возрастанию',
  /*detailed info*/
  species: 'Вид',
  dog: 'Пёсик',
  cat: 'Котик',
  bird: 'Птица',
  fish: 'Рыбка',
  /*no order*/
  all_category: 'Все питомцы',
  dog_category: 'Песики',
  cat_category: 'Коты',
  fish_category: 'Рыбы',
  bird_category: 'Птицы',
  black: 'Черный',
  white: 'Белый',
  gray: 'Серый',
  red: 'Красный',
  brown: 'Коричневый',
  orange: 'Оранжевый',
  yellow: 'Желтый',
  green: 'Зеленый',
  blue: 'Синий',
  apply: 'Применить',
  remove_filters: 'Сбросить фильтры',
  price: 'Цена',
  is_sterile: 'Стерилизован',
  cart_is_empty: 'Тут ничего нет',
  continue_shopping: 'Продолжить покупки',
  from: 'От',
  to: 'До',
  color: 'Цвет',
  checkout: 'Оформить заказ',
  cart: 'Корзина',
  name: 'Имя',
  phone_number: 'Телефон',
  address: 'Адресс',
  city: 'Город',
  notes: 'Заметки',
  complete_order: 'Подтвердить заказ',
  total_price: 'Всего',
  contact_details: 'Контактная информация',
  delivery_information: 'Детали доставки',
  order: 'Заказ',
  open_big_picture: 'Открыть в полном размере',
  delivery_info: 'Доставка бесплатная. Мы лично доставим питомца в вашу квартиру в кратчайшие сроки',
  payment_info: 'На данный момент вы можете оплатить только курьеру',
  order_success: 'Успешно. Номер вашего заказа:',
  add_to_cart: 'Добавить в корзину',
  already_in_cart: 'Питомец уже в корзине',
  breed: 'Порода',
  gender: 'Пол',
  weight: 'Вес',
  kg: 'кг',
  yes: 'Да',
  no: 'Нет',
  payment: "Оплата",
  in: 'в',
  search_result: 'Поиск',
  most_relevant: 'По релевантности',
  hair: 'Длинна шерсти'
};

function formatCounter(n, first, second, third) {
  // slice is needed only if n is more than 99, but this makes function universal
  n = String(n).slice(-2);
  if (n.length === 2 && n[0] === '1') {
    return first;
  }

  n = n.slice(-1);
  if (n === '1') {
    return second;
  }
  if (n === '2' || n === '3' || n === '4') {
    return third;
  }
  return first
}