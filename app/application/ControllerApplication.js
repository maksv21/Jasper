import {ControllerGoods} from "../components/goods/ControllerGoods.js";
import {ControllerHeader} from "../components/header/ControllerHeader.js";
import {Publisher} from "../components/share/Publisher.js";
import {ModelApplication} from "./ModelApplication.js"
import {ControllerCart} from "../components/cart/ControllerCart.js";
import {ControllerProductDetails} from "../components/productDetails/ControllerProductDetails.js";
import {ControllerFilterAndSearch} from "../components/filterAndSearch/ControllerFilterAndSearch.js";
import {ViewApplication} from "./ViewApplication.js";
import {ControllerTopMenu} from "../components/topMenu/ControllerTopMenu.js";
import {ControllerPageRenderer} from "../components/pageRenderer/ControllerPageRenderer.js";
import {ControllerCheckout} from "../components/checkout/ControllerCheckout.js";
import {ControllerOtherPages} from "../components/otherPages/ControllerOtherPages.js";

export class ControllerApplication {
  constructor() {
    this._publisher = new Publisher();
    this._view = new ViewApplication();
    this._model = new ModelApplication(this._publisher.ctrls);

    this._header = new ControllerHeader(this._publisher.ctrls);
    this._goods = new ControllerGoods(this._publisher.ctrls);
    this._topMenu = new ControllerTopMenu(this._publisher.ctrls);

    this._search = new ControllerFilterAndSearch(this._publisher.ctrls);
    this._productDetails = new ControllerProductDetails(this._publisher.ctrls);
    this._cart = new ControllerCart(this._publisher.ctrls);

    this._checkout = new ControllerCheckout(this._publisher.ctrls);
    this._otherPages = new ControllerOtherPages(this._publisher.ctrls);
    this._pageRenderer = new ControllerPageRenderer(this._publisher.ctrls);

    // if user opens multiple tabs
    window.addEventListener('focus', () => this._publisher.notify('cart-updated'));

    this._publisher.subscribe('go-home', () => {
      this._publisher.notify('render-filters');
      this._publisher.notify('render-goods', {});
    });

    this._checkCurrentPage();
  }

  _checkCurrentPage() {
    const url = window.location.href;
    let productId = url.match(/\?product_id=.+\?*/);
    if(productId) {
      productId = productId[0].match(/\d+/);
      productId = Number(productId[0]);
      this._publisher.subscribe('database-loaded', () => {
        this._publisher.notify('render-details', productId);
      });
    }
  }
}