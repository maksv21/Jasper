import {ViewProductDetails} from "./ViewProductDetails.js";
import {ModelProductDetails} from "./ModelProductDetails.js";

export class ControllerProductDetails {
  constructor({notify, subscribe, removeSubscribe}) {
    this._model = new ModelProductDetails();
    this._view = new ViewProductDetails();
    this._notify = notify;
    this._subscribe = subscribe;
    this._removeSubscribe = removeSubscribe;

    subscribe('render-details', this._renderDetails.bind(this));
  }

  _renderDetails(productId) {
    const productObjSource = this._model.getProductObj(productId);

    const productObj = this._model.prepareProductObj(productObjSource);
    const title = productObj.title;

    const categoryTitle = [{
      title: this._model.prepareTitle(productObjSource.species),
      action: () => this._notify('show-category', productObjSource.species)
    }];

    const HTML = this._view.getProductDetailsPage({
      productObj, infoArr: this._model.prepareInfoArr(productObjSource),
    });

    const afterLoadFunc = () => {
      let container;
      this._notify('get-renderer-container', element => container = element);

      this._view.addListeners({
        container,
        imgEvent: this._view.renderProductPicture.bind(this._view, productObj.image),
        buyEvent: this._onClickBuy.bind(this, productId),
      });

      this._updateBuyBtn(productId);
      this._subscribe('cart-updated', this._updateBuyBtn.bind(this, productId), {id: this});

      this._view.setUrl(productObj.id);
    };

    const afterCloseFunc = () => {
      this._view.setUrl();
      this._removeSubscribe('cart-updated', null, this);
    };

    this._notify('render-page', {title, categoryTitle, HTML, afterLoadFunc, afterCloseFunc});
  }

  _updateBuyBtn(productId) {
    const isProductInCart = this._model.isProductInCart(productId);
    this._view.renderBuyBtn(isProductInCart);
  }

  _onClickBuy(id) {
    const productInCart = this._model.isProductInCart(id);
    if (!productInCart) {
      this._model.addProductToCart(id);
    }
    this._updateBuyBtn(id);
    this._view.hideProductPicture(() => this._notify('show-cart'));
  }
}