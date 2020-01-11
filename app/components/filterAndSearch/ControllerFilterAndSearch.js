import {ModelFilterAndSearch} from "./ModelFilterAndSearch.js";
import {ViewFilterAndSearch} from "./ViewFilterAndSearch.js";
import {Localizer} from "../share/Localizer.js";

export class ControllerFilterAndSearch {
  _local = new Localizer();

  constructor({subscribe, notify}) {
    this._subscribe = subscribe;
    this._notify = notify;

    this._loadStatus = 2;
    subscribe('goods-loaded', this._launch.bind(this));
    subscribe('database-loaded-all', this._launch.bind(this));
  }

  _launch() {
    this._loadStatus -= 1;
    if(this._loadStatus) { return; }

    this._view = new ViewFilterAndSearch({
      onApply: this._applyFilters.bind(this),
      onRemove: this._removeAllFilters.bind(this)
    });

    this._model = new ModelFilterAndSearch();
    this.currentArr = 'all';
    this._renderFilters(undefined, true);

    this._subscribe('render-filters', this._renderFilters.bind(this));
    this._subscribe('search', this._searchGoods.bind(this));
    this._subscribe('go-home', () => this.currentArr = 'all');
    this._subscribe('show-category', this._showCategory.bind(this));
  }

  _searchGoods({value, category}) {
    this._removeAllFilters();

    const valueIsNumber = Number.isInteger(+value);
    const searchTitle = this._local.get('search_result') + `: "${value}" ${category !== 'all' ?
      this._local.get('in') + ' ' + this._local.get(category + '_category') : ''}`;

    if (!valueIsNumber) {
      let filteredArr;
      if (category !== 'all') {
        filteredArr = this._model.getCategoryData(category);
      }
      const resultArr = this._model.searchGoods(value, filteredArr);

      this._renderFilters(resultArr);

      this._notify('render-goods', {goodsArr: resultArr, skipSorting: true});
      this._notify('show-title', searchTitle);
      this._notify('show-sorting', 'most_relevant');

      this.currentArr = resultArr;


    } else if (this._model.isThereSuchProduct(+value)) {
      this._notify('render-details', +value)
    } else {
      this._notify('render-goods', {goodsArr: []});
      this._notify('show-title', searchTitle);
      this._notify('hide-sorting');

      this.currentArr = [];
    }
  }

  _showCategory(category) {
    this._removeAllFilters();
    if (category === 'all') {
      this._renderFilters();

      this._notify('render-goods', {});
      this._notify('show-title', null);
      this.currentArr = 'all'
    } else {
      const resultArr = this._model.getCategoryData(category);

      this._renderFilters(resultArr);

      this._notify('render-goods', {goodsArr: resultArr});
      this._notify('show-title', `${this._local.get(category + '_category')}`);
      this.currentArr = resultArr;
    }
  }

  _applyFilters() {
    const checked = this._view.getCheckedItems();
    const price = this._view.getPriceValue();
    const filteredArr = this._model.filterGoods(checked, price.from, price.to, this.currentArr);

    this._notify('render-goods', {goodsArr: filteredArr});

  }

  _removeAllFilters() {
    this._notify('render-goods', this.currentArr !== 'all' ? {goodsArr: this.currentArr} : {});

    this._view.removeAllFilters();
  }

  _renderFilters(arr, showAnim) {
    this._model.getFilters(arr).then(({arr, maxPrice}) => this._view.renderFilters(arr, maxPrice, showAnim));
  }
}

