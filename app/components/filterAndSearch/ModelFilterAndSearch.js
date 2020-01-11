export class ModelFilterAndSearch {
  constructor() {
    this._productsArr = JSON.parse(sessionStorage.getItem('jasper_products'));
    const altLang = JSON.parse(sessionStorage.getItem('jasper_products_alt_lang'));

    this._productsArr.forEach((item, index) => item.altBreed = altLang[index].breed);
  }

  isThereSuchProduct(id) {
    return this._productsArr.find(item => item.id === id);
  }

  searchGoods(value, arr = this._productsArr) {
    return this._searchInArr(arr, value);
  }

  _searchInArr(arr, value,) {
    let result;

    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['breed', 'altBreed', 'species', 'color'],
    };

    const fuse = new Fuse(arr, options);
    result = fuse.search(value);

    result.push(...fuse.search(this._changeLayout(value)));
    result.push(...fuse.search(this._invertLetters(value)));

    return result;
  }


  _changeLayout(str) {
    const replacer = {
      "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u",
      "ш": "i", "щ": "o", "з": "p", "ф": "a", "ы": "s",
      "в": "d", "а": "f", "п": "g", "р": "h", "о": "j", "л": "k", "д": "l",
      "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b",
      "т": "n", "ь": "m",
      "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
      "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
      "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
      ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
      "n": "т", "m": "ь", ",": "б", ".": "ю",
    };

    return str.replace(/[А-яA-z/,.;'\]\[]/g, x => {
      return x === x.toLowerCase() ? replacer[x] : replacer[x.toLowerCase()].toUpperCase();
    });
  }

  _invertLetters(str) {
    const replacer = {
      'а': 'a',
      'б': 'b',
      'в': 'v',
      'г': 'g',
      'д': 'd',
      'е': 'e',
      'ё': 'yo',
      'ж': 'zh',
      'з': 'z',
      'и': 'i',
      'й': 'y',
      'к': 'c',
      'л': 'l',
      'м': 'm',
      'н': 'n',
      'о': 'o',
      'п': 'p',
      'р': 'r',
      'с': 's',
      'т': 't',
      'у': 'u',
      'ф': 'f',
      'х': 'h',
      'ц': 'c',
      'ч': 'ch',
      'ш': 'sh',
      'щ': 'shh',
      'ъ': '',
      'ы': 'i',
      'ь': '',
      'э': 'a',
      'ю': 'u',
      'я': 'ya',
      'a': 'а',
      'b': 'б',
      'c': 'с',
      'd': 'д',
      'e': 'е',
      'f': 'ф',
      'g': 'г',
      'h': 'х',
      'i': 'и',
      'j': 'дж',
      'k': 'к',
      'l': 'л',
      'm': 'м',
      'n': 'н',
      'o': 'о',
      'p': 'п',
      'q': 'кью',
      'r': 'р',
      's': 'с',
      't': 'т',
      'u': 'ю',
      'v': 'в',
      'w': 'в',
      'x': 'икс',
      'y': 'я',
      'z': 'з',
    };

    return str.replace(/[А-яA-z/,.;'\]\[]/g, x => {
      return x === x.toLowerCase() ? replacer[x] : replacer[x.toLowerCase()].toUpperCase();
    });
  }

  getCategoryData(category) {
    return this._productsArr.filter(item => item.species === category);
  }

  filterGoods(nodes, priceFrom, priceTo, arr) {
    const productsArr = arr !== 'all' ? arr : this._productsArr;
    const filtersObj = {};

    nodes.forEach(item => {
      const filter = item.closest('[data-filter]').dataset.filter;

      if (!filtersObj[filter]) {
        filtersObj[filter] = [];
      }

      filtersObj[filter].push(item.dataset.value)
    });

    priceFrom = parseInt(priceFrom);
    priceTo =  parseInt(priceTo);

    priceFrom = (Number.isInteger(priceFrom) && priceFrom >= 0) ? priceFrom : 0;
    priceTo = (Number.isInteger(priceTo) && priceTo >= 0) ? priceTo : Infinity;

    return productsArr.filter(item => {
      return item.price >= priceFrom && item.price <= priceTo && Object.keys(filtersObj).every(filterName => {
        if (filterName !== 'color') {
          return filtersObj[filterName].includes(String(item[filterName]))
        } else {
          return item[filterName].split('-').some(color => filtersObj[filterName].includes(color))
        }
      });
    });
  }

  getFilters(arr = this._productsArr) {
    if (!this._worker) {
      this._worker = new Worker('app/components/filterAndSearch/workerSearch.js');
    }

    this._worker.postMessage(arr);
    return new Promise(resolve => this._worker.onmessage = value => resolve(value.data));
  }
}