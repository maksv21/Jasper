import {dict as en} from './dict/en.js'
import {dict as ru} from './dict/ru.js'

export class Localizer {
  constructor() {
    if(!Localizer.instance) {
      this._lang = JSON.parse(localStorage.getItem('jasper_settings')).lang;
      this._allLangs = {en, ru,};
      this._dict = this._allLangs[this._lang];

      Localizer.instance = this;
    }

    return Localizer.instance;
  }

  static instance = false;

  get(value, params) {
    if(this._dict[value] !== undefined) {
      return typeof this._dict[value] === 'function' ? this._dict[value](params) : this._dict[value];
    } else if(this._allLangs.en[value] !== undefined) {
      return (typeof this._allLangs.en[value] === 'function')
        ? this._invertLetters(this._allLangs.en[value](params)) : this._invertLetters(this._allLangs.en[value]);
    }

    if(localStorage.getItem('jasper_debug') === '1') {
      return '_' + value;
    }

    let tempArr = value.split('_');
    tempArr[0] = tempArr[0][0].toUpperCase() + tempArr[0].slice(1);

    return this._lang === 'ru' && !localStorage.getItem('jasper_en') ? this._invertLetters(tempArr.join(' ')) : tempArr.join(' ');
  }

  _invertLetters(str) {
    const replacer = {
      'a': 'а', 'b': 'б', 'c': 'с', 'd': 'д', 'e': 'е', 'f': 'ф', 'g': 'г', 'h': 'х', 'i': 'и', 'j': 'дж', 'k': 'к',
      'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'q': 'кью', 'r': 'р', 's': 'с', 't': 'т', 'u': 'ю', 'v': 'в', 'w': 'в',
      'x': 'икс', 'y': 'я', 'z': 'з',
    };

    return str.replace(/[A-z]/g, x => {
      return x === x.toLowerCase() ? replacer[x] : replacer[x.toLowerCase()].toUpperCase();
    });
  }
}