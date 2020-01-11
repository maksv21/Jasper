import {TemplateSorting} from "./TemplateSorting.js";
import {TemplateTitle} from "./TemplateTitle.js";
import {Localizer} from "../share/Localizer.js";

export class ViewTopMenu {
  _local = new Localizer();
  constructor() {
    this._title = document.querySelector('.current-title');
    this._sorting = document.querySelector('.sorting-container');
    this._titleTemplate = new TemplateTitle();
  }

  renderTitle(titlesArr, clickListener) {
    if(!this._title.innerHTML) {
      this._title.classList.add('anim-in');
      this._title.addEventListener('animationend', () => this._title.classList.remove('anim-in'), {once: true});
    }

    let title = this._titleTemplate.getHomeIcon();

    titlesArr.forEach(titleObj => title += this._titleTemplate.getNextTitle(titleObj));

    this._title.innerHTML = title;

    this._title.onclick = clickListener;
  }

  hideTitle() {
    this._removingFunc(this._title);
    this._title.onclick = null;
  }

  renderSorting(eventListener, currentSorting) {
    if(!this._sorting.innerHTML) {
      this._sorting.innerHTML = (new TemplateSorting()).getTemplateSorting(currentSorting);
      if (eventListener) {
        this._sorting.addEventListener('click', eventListener);
      }
    }

    this._sorting.querySelector('.sorting-type').innerHTML = this._local.get(currentSorting);
  }

  hideSoring() {
    this._removingFunc(this._sorting);
  }

  setSortValue(value) {
    this._sorting.querySelector('.sorting-type').innerText = this._local.get(value)
  }

  _removingFunc(container) {
    container.classList.add('anim-out');

    container.addEventListener('animationend', () => {
      container.innerHTML = '';
      container.classList.remove('anim-out');
    }, {once: true});
  }
}