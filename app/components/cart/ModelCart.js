import {Formatter} from "../share/Formatter.js";

export class ModelCart {
  _formatter = new Formatter();

  getCartData() {
    const productsInCart = [...new Set(JSON.parse(localStorage.getItem('jasper_cart')))];

    const goods = JSON.parse(sessionStorage.getItem('jasper_products'));

    let price = 0;
    const arr = productsInCart.map(id => {
      const productObj = goods.find(item => item.id === id);
      price += productObj.price;

      return {
        image_small: productObj.img_small,
        title: this._formatter.formatName(productObj.breed),
        price: '$' + productObj.price.toFixed(2),
        id: productObj.id
      }
    });


    return {arr: arr, price: '$' + price.toFixed(2)};
  }

  removeFromCart(id) {
    let productsInCart = JSON.parse(localStorage.getItem('jasper_cart'));
    productsInCart = new Set(productsInCart);
    productsInCart.delete(+id);
    localStorage.setItem('jasper_cart', JSON.stringify([...productsInCart]));
  }
}