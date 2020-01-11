import {Localizer} from "../share/Localizer.js";
export class TemplateFilter {
  _local = new Localizer();
  getTemplateFilter() {
    return `
  <div class="col filters">    
    <div class="card anim">
      <div class="card-body">
        <button type="button" class="apply-filters btn btn-secondary mt-2 w-100">${this._local.get('apply')}</button>
        <button type="button" class="remove-filters btn btn-light mt-2 w-100">${this._local.get('remove_filters')}</button>
    </div>
    </div>
    
    <div class="card anim">
      <button class="btn btn-light" data-toggle="collapse" data-target=".filter1" 
      aria-expanded="true" aria-controls="collapse2">
        ${this._local.get('price')}
      </button>

      <div class="collapse filter1 show" data-filter="price">
        <div class="card-body">
        ${this._local.get('from')}:
        <input type="number" class="from-input form-control" aria-describedby="inputGroup-sizing-sm" placeholder="0">
        ${this._local.get('to')}:
        <input type="number" class="to-input form-control" aria-describedby="inputGroup-sizing-sm" placeholder="0">
        </div>
    </div>
    </div>
    
    <div class="filters-content"></div>
  </div>
  `
  }

  getFilterItemStart(title, showAnim) {
    return `
    <div class="card ${showAnim ? 'anim' : ''}">
      <button class="btn btn-light" data-toggle="collapse" data-target=".filt-${title}">
        ${this._local.get(title)}
      </button>

      <div class="filt-${title} collapse show" data-filter="${title}">
        <div class="card-body">
    `
  }

  getFilterItem(filterTitle, itemTitle) {
    return `
    <div>
    <label for="${filterTitle+itemTitle}">
      <input type="checkbox" id="${filterTitle+itemTitle}" data-value="${itemTitle}">
      ${this._local.get(itemTitle)}
    </label>
    </div>
    `
  }

  getFilterItemEnd() {
    return `
    </div>
    </div>
    </div>
    `
  }
}

