import {TemplateCartSkeleton} from "./TemplateCartSkeleton.js";
import {TemplateEmptyCart} from "./TemplateEmptyCart.js";
import {TemplateNonemptyCart} from "./TemplateNonemptyCart.js";
import {Helper} from "../share/Helper.js";

export class ViewCart {
  _skeletonTemplate = new TemplateCartSkeleton();
  _nonemptyTemplate = new TemplateNonemptyCart();
  _emptyTemplate = new TemplateEmptyCart();
  cartStatus;
  _helper = new Helper();

  constructor() {
    document.body.insertAdjacentHTML('beforeend', this._skeletonTemplate.getCartSkeleton());
    this.container = document.querySelector('.cart-container .modal-content');
  }

  renderEmptyCart() {
    this._helper._loadImg('app/graphics/empty_cart.jpg', () => {
      this.container.innerHTML = this._emptyTemplate.getEmptyCart();
      this._showCart();
    });

    this.cartStatus = 'empty'
  }

  renderCart({cartArr, totalPrice, onClickProduct, onClickCheckout}) {
    this.container.innerHTML = this._nonemptyTemplate.getCart();
    this._fillCart(cartArr);
    this._showCart();

    this.container.querySelector('.total-price').innerText = totalPrice;
    this.container.querySelector('.modal-body').addEventListener('click', onClickProduct);

    this.container.querySelector('.checkout').addEventListener('click', onClickCheckout);
  }

  updateCart(cartArr, totalPrice) {
    if(cartArr) {this._fillCart(cartArr);}

    this.container.querySelector('.total-price').innerText = totalPrice;
  }

  _fillCart(cartArr){
    const items = this.container.querySelector('.modal-body');
    items.innerHTML = cartArr.map(item => this._nonemptyTemplate.getProduct(item)).join('');

    this.cartStatus = 'not empty';
  }

  makeCartEmpty() {
    if(this.container) {
      this._helper._loadImg('app/graphics/empty_cart.jpg', () => {
        this.container.innerHTML = this._emptyTemplate.getEmptyCart();
        const image = this.container.querySelector('.empty-cart-image');
        image.classList.add('anim-in');
        image.addEventListener('animationend', () => image.classList.remove('anim-in'), {once: true})
      });
    }

    this.cartStatus = 'empty';
  }

  makeCartNonempty({cartArr, totalPrice, onClickProduct, onClickCheckout}) {
    this.container.innerHTML = this._nonemptyTemplate.getCart();
    this._fillCart(cartArr);

    this.container.querySelector('.total-price').innerText = totalPrice;
    this.container.querySelector('.modal-body').addEventListener('click', onClickProduct);

    this.cartStatus = 'not empty';

    this.container.querySelector('.checkout').addEventListener('click', onClickCheckout);
  }

  _showCart() {
    $('.cart-container').modal();
  }

  hideCart() {
    $('.cart-container').modal('hide');
  }

  isCartVisible() {
    return $('.cart-container').is(':visible');
  }
}