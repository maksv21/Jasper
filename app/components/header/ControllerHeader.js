import {ViewHeader} from "./ViewHeader.js";

export class ControllerHeader {
  constructor({notify, subscribe}) {
    this._view = new ViewHeader();
    this._notify = notify;
    this._settings = JSON.parse(localStorage.getItem('jasper_settings'));

    this._view.renderHeader({
      lang: this._settings.lang,
      searchListener: this._onSearch.bind(this),
      clickListener: this._onClick.bind(this),
    });

    subscribe('show-title', this._view.hideCategories.bind(this._view));
    subscribe('starting-load-goods', this._view.hideCategories.bind(this._view));
    subscribe('goods-loaded', this._view.renderFooter.bind(this._view), {once: true});
  }

  _onSearch(event) {
    event.preventDefault();

    const searchValue = event.target.search.value;
    if (searchValue !== '') {
      const category = this._view.getSearchCategory();
      this._notify('search', {value: searchValue, category});
    } else {
      this._view.focusSearch()
    }
  }

  _onClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target) {
      return;
    }

    const action = target.dataset.action;
    switch (action) {
      case 'en':
      case 'ru': {
        this._settings.lang = action;
        localStorage.setItem('jasper_settings', JSON.stringify(this._settings));
        window.location.reload();
        break;
      }

      case 'go-home': {
        this._notify('go-home', {});
        break;
      }

      case 'cart': {
        this._notify('show-cart');
        break;
      }

      case 'category': {
        this._notify('show-category', target.dataset.category);
        break;
      }

      case 'search-category': {
        this._view.changeSearch(target.dataset.category, target.dataset.category + '_category');
        break;
      }

      case 'page': {
        this._notify('render-page', {
          title: target.value,
          HTML: this._view.getPageTemplate(),
        });
        break;
      }

    }
  }
}