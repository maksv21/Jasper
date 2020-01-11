import {TemplateHeader} from "./TemplateHeader.js";
import {TemplateFooter} from "./TemplateFooter.js";
import {Localizer} from "../share/Localizer.js";

export class ViewHeader {
  _local = new Localizer();
  constructor() {
    this._container = document.querySelector('.app-container');
  }

  renderHeader({lang, searchListener, clickListener}) {
    this._container.insertAdjacentHTML('afterbegin', (new TemplateHeader).getHeaderTemplate(lang));

    const header = document.querySelector('nav');
    header.addEventListener('click', clickListener);
    document.querySelector('.categories').addEventListener('click', clickListener);
    header.addEventListener('submit', searchListener);
  }

  renderFooter() {
    this._container.insertAdjacentHTML('afterend', (new TemplateFooter()).getFooter());
  };

  hideCategories() {
    $('.categories').collapse('hide');
  }

  changeSearch(category, title) {
    const container = this._container.querySelector('.search-category');
    container.innerText = this._local.get(title);
    container.dataset.category = category;
  }

  getSearchCategory() {
    return this._container.querySelector('.search-category').dataset.category;
  }

  focusSearch() {
    this._container.querySelector('.search-input').focus();
  }
}