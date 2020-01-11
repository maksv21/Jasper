import {TemplateCheckout} from "./TemplateCheckout.js";
import {TemplateOrderItem} from "./TemplateOrderItem.js";

export class ViewCheckout {
  _templateCheckout = new TemplateCheckout();
  _templateItem = new TemplateOrderItem();

  setContainer(elem) {
    this._container = elem;
  }

  getCheckoutPageTemplate(price) {
    return this._templateCheckout.getCheckoutPage(price);
  }

  addOrderInfo(orderArr) {
    this._container.querySelector('.order-container').innerHTML = orderArr.map(item => {
      return this._templateItem.getItem(item);
    }).join('');
  }

  fillForm(fillData) {
    const form = this._container.querySelector('form');

    Object.keys(fillData).forEach(item => form[item].value = fillData[item]);
  }

  addSubmitListener(func) {
    this._container.addEventListener('submit', func);
  }

  addInputListener(func) {
    this._container.addEventListener('input', func);
  }

  renderComplitedPage(orderId) {
    this._container.innerHTML = this._templateCheckout.getSuccess(orderId);
  }
}