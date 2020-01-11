import {ViewCheckout} from "./ViewCheckout.js";
import {ModelCheckout} from "./ModelCheckout.js";
import {Localizer} from "../share/Localizer.js";

export class ControllerCheckout {
  constructor({subscribe, notify}) {
    this._notify = notify;
    this._view = new ViewCheckout();
    this._model = new ModelCheckout();
    this._local = new Localizer();

    this._fillData = {};

    subscribe('render-checkout', this._renderCheckout.bind(this));
  }

  _renderCheckout(orderData) {
    this._notify('render-page', {
      title: this._local.get('checkout'),
      HTML: this._view.getCheckoutPageTemplate(orderData.price),
      afterLoadFunc: () => {
        let container;
        this._notify('get-renderer-container', element => container = element);

        this._view.setContainer(container);

        this._view.addOrderInfo(orderData.arr);
        this._view.fillForm(this._fillData);

        this._view.addSubmitListener(this._onSubmit.bind(this, orderData));
        this._view.addInputListener(this._onInput.bind(this));
      },
    });
  }

  _onSubmit(orderData, event) {
    event.preventDefault();
    orderData = this._model.prepareOrderData(orderData);

    const orderId = this._model.generateOrderId();
    const message = this._model.prepareMessage(event.target, orderId, orderData);
    this._model.sendMessage(message).then(result => {
      if(result.ok) {
        this._view.renderCompletedPage(orderId);
        this._model.clearCart();
      } else {
        this._view.renderErrorPage(result.statusText);
      }
    });

  }

  _onInput(e) {
    this._fillData[e.target.name] = e.target.value;
  }
}