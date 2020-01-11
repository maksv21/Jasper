import {ModelGoods} from './ModelGoods.js';
import {ViewGoods} from './ViewGoods.js';


export class ControllerGoods {
  _currentProductsArr;

  constructor({subscribe, notify}) {
    this._subscribe = subscribe;
    this._notify = notify;
    this._settings = JSON.parse(localStorage.getItem('jasper_settings'));
    this._currentPage = 1;

    this._model = new ModelGoods();
    this._view = new ViewGoods({paginationEventListener: this._paginationOnClick.bind(this)});

    subscribe('database-loaded', () => {
      this._getGoods({goodsArr: this._model.loadGoods()});
    });

    subscribe('render-goods', ({goodsArr = this._model.allProductsArray, skipSorting}) => {
      this._currentPage = 1;
      this._getGoods({goodsArr: goodsArr, skipSorting: skipSorting});
    });

    subscribe('remove-goods', this._view.removeGoods.bind(this._view));
    subscribe('sorting-changed', () => {
      this._currentPage = 1;
      this._getGoods({});
    });

    this._view.addListenerToProductsContainer(this._productOnClick.bind(this));
  }

  _getGoods({start = 0, goodsArr = this._currentProductsArr, skipSorting}) {
    this._notify('starting-load-goods');
    this._currentProductsArr = goodsArr;

    if (this._currentProductsArr.length) {
      this._view.renderGoods({
          goodsArray: this._model.prepareGoodsArr(start, start + this._settings.goodsPerPage, goodsArr, skipSorting),
          onloadFunc: () => this._notify('goods-loaded')
        },
      );

      if (!this._view.isTherePagination()) {
        this._subscribe('goods-loaded', () => {
          this._renderPagination();
        }, {once: true});
      } else {
        this._renderPagination();
      }
    } else {
      this._view.renderNothing();
    }
  }

  _renderPagination() {
    this._view.renderPagination(this._model.calculatePagination(this._currentPage,
      Math.ceil(this._currentProductsArr.length / this._settings.goodsPerPage)));
  }

  _paginationOnClick(event) {
    const target = event.target.closest('[data-page]');
    if (target) {
      const page = target.dataset.page;

      if (page > 0) {
        this._currentPage = page;
        document.documentElement.scrollTo({top: 0, behavior: "smooth"});
        this._getGoods({start: (page - 1) * this._settings.goodsPerPage, skipSorting: true})
      }
    }
  }

  _productOnClick(event) {
    if (event.target.closest('.product-picture, .product-card-text')) {
      const productId = Number(event.target.closest('.product-card').dataset.id);
      this._notify('render-details', productId);
    }
  }


}




