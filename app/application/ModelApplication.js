export class ModelApplication {
  _productsDatabaseLinks = {
    'en': 'https://maksv21.github.io/softserve/demo2/database/animals_en.json',
    'ru': 'https://maksv21.github.io/softserve/demo2/database/animals_ru.json',
  };
  _settingsTemplate = {
    lang: 'en',
    goodsPerPage: 30,
    sorting: 'price-high',
  };

  constructor({notify, subscribe}) {
    this._notify = notify;
    this._subscribe = subscribe;

    this._checkAndLoadSettings();
    this._loadGoods();
    this._checkCart();
  }

  _checkAndLoadSettings() {
    this._settings = this._loadJSON('jasper_settings');

    if (!(this._settings && this._isSettingsValid(this._settings))) {
      this._settings = this._settingsTemplate;
      // in local storage must be value to use in other components
      localStorage.setItem('jasper_settings', JSON.stringify(this._settings));
    }
  }


  _isSettingsValid(value) {
    return ['en', 'ru'].includes(value.lang)
      && Number.isInteger(value.goodsPerPage) && value.goodsPerPage >= 5 && value.goodsPerPage <= 100
      && ['price-high', 'price-low', 'age-high', 'age-low'].includes(value.sorting);
  }

  _loadGoods() {
    this._downloadGoods(this._settings.lang).then(res => res).then(res => {
      sessionStorage.setItem('jasper_products', JSON.stringify(res));
      this._notify('database-loaded');
    });


    // for search required all languages
    this._subscribe('database-loaded', () => {
      //subscribe important, cause sometimes first lang loads after second
      this._downloadGoods(this._settings.lang === 'ru' ? 'en' : 'ru').then(res => {
        sessionStorage.setItem('jasper_products_alt_lang', JSON.stringify(res));
        this._notify('database-loaded-all');
      });
    }, {once: true});
  }

  _downloadGoods(lang) {
    return fetch(this._productsDatabaseLinks[lang]).then(response => response.json());
  }

  _checkCart() {
    const cart = this._loadJSON('jasper_cart');

    if (!(cart && this._isCartValid(cart))) {
      localStorage.setItem('jasper_cart', "[]");
    }
  }

  _isCartValid(arr) {
    return !arr.find(item => !(Number.isInteger(item) && item > 0))
  }

  _loadJSON(name) {
    let result = false;

    try {
      result = JSON.parse(localStorage.getItem(name));
    } catch (e) {
      /* ignore incorrect json error */
      if(e.name !== 'SyntaxError') {throw e}
    }

    return result;
  }
}