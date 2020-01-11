import {TemplateFilter} from "./TemplateFilter.js";

export class ViewFilterAndSearch {
  constructor({onApply, onRemove}) {
    this._filtTemplate = new TemplateFilter();
    this._container = document.querySelector('.filters-container');
    this._container.innerHTML = this._filtTemplate.getTemplateFilter();

    this._containerContent = this._container.querySelector('.filters-content');
    this._maxPriceInput = this._container.querySelector('.to-input');

    this._container.querySelector('.apply-filters').addEventListener('click', onApply);
    this._container.querySelector('.remove-filters').addEventListener('click', onRemove);
  }

  renderFilters(filtersArr, maxPrice, showAnim) {
    this._containerContent.innerHTML = filtersArr.map(filterObj => {
      const start = this._filtTemplate.getFilterItemStart(filterObj.filter, showAnim);
      const end = this._filtTemplate.getFilterItemEnd();

      let items = '';
      filterObj.set.forEach(filter => items += this._filtTemplate.getFilterItem(filterObj.filter, filter));

      return start + items + end
    }).join('');

    this._maxPriceInput.placeholder = maxPrice;
  }


  getCheckedItems() {
    return this._container.querySelectorAll('input:checked');
  }

  getPriceValue() {
    return {
      from: this._container.querySelector('.from-input').value,
      to: this._container.querySelector('.to-input').value,
    }
  }

  removeAllFilters() {
    this._container.querySelectorAll('input:checked').forEach(item => item.checked = false);

    this._container.querySelector('.from-input').value = '';
    this._container.querySelector('.to-input').value = '';
  }
}