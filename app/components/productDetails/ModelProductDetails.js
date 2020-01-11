import {Localizer} from '../share/Localizer.js';
import {Formatter} from '../share/Formatter.js';

export class ModelProductDetails {
  _local = new Localizer();
  _formatter = new Formatter();

  getProductObj(id) {
    const productsArr = JSON.parse(sessionStorage.getItem('jasper_products'));
    return productsArr.find(item => item.id === id);
  }

  prepareProductObj(productObj) {
    return {
      title: this._formatter.formatName(productObj.breed),
      image: productObj.image,
      price: '$' + productObj.price,
    }
  }

  prepareInfoArr(productObj) {
    const basicFunc = (item) => [this._local.get(item), this._local.get(productObj[item].toLowerCase())];
    const formattingMethods = {
      'id': (item) => [this._local.get('pet_identifier'), productObj[item]],
      'species': basicFunc,
      'gender': basicFunc,

      'weight': (item) => [this._local.get(item), productObj.weight + ' ' + this._local.get('kg')],

      'birth_date': (item) => [this._local.get('age'), this._formatter.formatAge(productObj[item])],

      'color': (item) => [this._local.get(item), this._formatter.formatColor(productObj[item])],

      'breed': (item) => [this._local.get(item), this._formatter.formatName(productObj[item])],

      'is_sterile': (item) => [this._local.get(item), this._local.get(productObj[item] ? 'yes' : 'no')],

      'hair': basicFunc,
      'type': basicFunc,
      'water_type': basicFunc,
      'temper': basicFunc,
      'activity': basicFunc,
    };
    const orderSource = ['species', 'breed', 'gender', 'weight', 'birth_date', 'color', 'is_sterile', 'hair',
      'type', 'water_type', 'temper', 'activity', 'id',];

    const order = orderSource.reduce((acc, item, index) => {
      acc[item] = index;
      return acc
    }, {});

    return Object.keys(productObj)
      .reduce((result, item) => {
        if (formattingMethods[item]) {
          result.push({name: item, value: formattingMethods[item](item)});
        }
        return result;
      }, [])
      .sort((a, b) => order[a.name] - order[b.name])
      .map(item => item.value);
  }

  addProductToCart(id) {
    const cart = JSON.parse(localStorage.getItem('jasper_cart'));
    cart.push(id);
    localStorage.setItem('jasper_cart', JSON.stringify(cart));
  }

  isProductInCart(id) {
    return JSON.parse(localStorage.getItem('jasper_cart')).includes(id);
  }

  prepareTitle(species) {
    return this._local.get(species + '_category');
  }
}