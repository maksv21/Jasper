import {Localizer} from "../share/Localizer.js";

export class TemplateSorting {
  _local = new Localizer();

  //not static to use _local
  getTemplateSorting(currentSorting) {
    return `
    <div class="btn-group sorting  p-1">
      <button type="button" class="btn btn-light btn-sm dropdown-toggle a-fi"
       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${this._local.get('sort_by')}: 
          <span class="sorting-type">${this._local.get(currentSorting)}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <button class="dropdown-item sort-item" type="button" value="price-low">${this._local.get('price-low')}</button>
        <button class="dropdown-item sort-item" type="button" value="price-high">${this._local.get('price-high')}</button>
        <button class="dropdown-item sort-item" type="button" value="age-low">${this._local.get('age-low')}</button>
        <button class="dropdown-item sort-item" type="button" value="age-high">${this._local.get('age-high')}</button>
      </div>
</div>`
  }
}