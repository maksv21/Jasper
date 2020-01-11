import {TemplateProduct} from './TemplateProduct.js';
import {TemplatePagination} from "./TemplatePagination.js";
import {TemplateNothing} from "./TemplateNothing.js";

export class ViewGoods {
  constructor({paginationEventListener}) {
    this._template = new TemplateProduct();
    this._productsContainer = document.querySelector('.products-container');
    this._paginationContainer = document.querySelector('.pagination');

    this._paginationContainer.addEventListener('click', paginationEventListener);
  }

  renderGoods({goodsArray, onloadFunc}) {
    this._productsContainer.classList.remove('anim-out');
    this._productsContainer.innerHTML = null;

    // hide prev
    if(this._productsContainer && this._productsContainer.innerHTML) {
      this.removeGoods({after: () => this._renderGoods(goodsArray, onloadFunc)});
    } else {
      this._renderGoods(goodsArray, onloadFunc)
    }

  }

  _renderGoods(goodsArray, onloadFunc) {
    this._productsContainer.classList.add('anim-in');
    this._productsContainer.innerHTML = goodsArray.map(item => this._template.getProductTemplate(item)).join('');

    // FIXME: workaround for one size for cards; it fills free space after cards
    this._productsContainer.insertAdjacentHTML('beforeend', `
<div class="card product-card flex-fill" style="opacity: 0"></div>
<div class="card product-card flex-fill" style="opacity: 0"></div>
<div class="card product-card flex-fill" style="opacity: 0"></div>
<div class="card product-card flex-fill" style="opacity: 0"></div>
`);

    this._productsContainer.addEventListener('animationend', () => {
      this._productsContainer.classList.remove('anim-in');
      onloadFunc();
    }, {once: true})
  }

  removeGoods({removePagination, after}) {
    this._productsContainer.classList.add('anim-out');

    this._productsContainer.addEventListener('animationend', () => {
      this._productsContainer.classList.remove('anim-out');
      this._productsContainer.innerHTML = null;

      if(after) {after();}
    }, {once: true});

    if(removePagination) {
      this._paginationContainer.innerHTML = null;
    }
  }

  renderPagination(pagesArr) {
    this._paginationContainer.innerHTML = pagesArr.map(item => TemplatePagination.getPaginationTemplate(item)).join('');
  }

  isTherePagination() {
    return !!this._paginationContainer.innerHTML;
  }

  addListenerToProductsContainer(func) {
    document.querySelector('.products-container').addEventListener('click', func);
  }

  renderNothing() {
    this._productsContainer.innerHTML = new TemplateNothing().getNothing();
    this._paginationContainer.innerHTML = '';
  }
}
