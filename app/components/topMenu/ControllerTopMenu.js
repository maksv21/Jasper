import {ViewTopMenu} from "./ViewTopMenu.js";
import {ModelTopMenu} from "./ModelTopMenu.js";

export class ControllerTopMenu {
  constructor({subscribe, notify}) {
    this._subscribe = subscribe;
    this._notify = notify;
    this._view = new ViewTopMenu();
    this._model = new ModelTopMenu();

    subscribe('goods-loaded', () => {
      this._view.renderSorting(this._sortingOnClick.bind(this), this._model.getCurrentSorting());
    }, {once: true});
    subscribe('show-title', this._renderTitle.bind(this));
    subscribe('get-title', (func) => func(this._currentTitle));
    subscribe('render-goods', this._view.renderSorting.bind(this._view, null, this._model.getCurrentSorting()));
    subscribe('hide-sorting', this._view.hideSoring.bind(this._view));
    subscribe('show-sorting', (value) => {
      this._view.renderSorting(null, this._model.getCurrentSorting());
      if(value) {
        this._view.setSortValue(value);
      }
    });
    subscribe('go-home', this._goHome.bind(this));
  }

  _renderTitle(value) {
    this._currentTitle = value;

    if (!value) {
      this._view.hideTitle();
    } else {
      if (!Array.isArray(value)) {
        value = [{title: value}]
      }

      this._view.renderTitle(this._model.prepareTitleArr(value), this._onClickTitle.bind(this, value));
    }
  }

  _onClickTitle(titlesArr, event) {
    const target = event.target.closest('[data-id]');
    if (target) {
      const id = target.dataset.id;
      if (id === 'title') {
        this._notify('go-home');
      } else {
        if(titlesArr[+id].action) {titlesArr[+id].action();}
      }
    }
  }

  _sortingOnClick(event) {
    const target = event.target.closest('.sort-item');

    if(target) {
      if(this._model.changeSorting(target.value)) {
        this._view.setSortValue(target.value);
        this._notify('sorting-changed');
      }
    }
  }

  _goHome() {
    this._currentTitle = null;
    this._view.hideTitle();
  }
}