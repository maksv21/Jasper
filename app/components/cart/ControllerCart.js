import {ViewCart} from "./ViewCart.js";
import {ModelCart} from "./ModelCart.js";
import {Localizer} from "../share/Localizer.js";

export class ControllerCart {
  constructor({subscribe, notify}) {
    this._notify = notify;
    this._view = new ViewCart();
    this._model = new ModelCart();
    this._local = new Localizer();

    subscribe('show-cart', this._showCart.bind(this));
    subscribe('cart-updated', source => {
      if (source !== 'from-cart' && this._view.isCartVisible()) {
        this._updateCart()
      }
    });
  }

  _showCart() {
    const cartData = this._model.getCartData();
    if (cartData.arr.length) {
      this._view.renderCart({
        cartArr: cartData.arr,
        totalPrice: cartData.price,
        onClickProduct: this._onClickProduct.bind(this),
        onClickCheckout: this._onClickCheckout.bind(this, cartData),
      });
    } else {
      this._view.renderEmptyCart();
    }
  }

  _updateCart() {
    const cartData = this._model.getCartData();
    switch (true) {
      case (cartData.arr.length && this._view.cartStatus !== 'empty'): {
        this._view.updateCart(cartData.arr, cartData.price);
        break;
      }

      case (cartData.arr.length > 0): {
        this._view.makeCartNonempty({
          cartArr: cartData.arr,
          totalPrice: cartData.price,
          onClickProduct: this._onClickProduct.bind(this),
          onClickCheckout: this._onClickCheckout.bind(this, cartData),
        });
        break;
      }

      case (this._view.cartStatus !== 'empty'): {
        this._view.makeCartEmpty();
        break;
      }
    }
  }

  _onClickProduct(event) {
    if (event.target.closest('.remove-btn')) {
      this._model.removeFromCart(event.target.closest('.cart-item').dataset.id);
      this._notify('cart-updated', 'from-cart');

      const cartData = this._model.getCartData();
      if (cartData.arr.length) {
        this._view.updateCart(null, cartData.price);
      } else {
        event.target.closest('.cart-item').addEventListener('transitionend', this._view.makeCartEmpty.bind(this._view));
      }
    } else if (event.target.closest('.open-product-btn')) {
      this._view.hideCart();
      this._notify('render-details', +event.target.closest('.cart-item').dataset.id);
    }
  }

  _onClickCheckout(cartData) {
    this._view.hideCart();
    this._notify('render-checkout', cartData);
  }
}