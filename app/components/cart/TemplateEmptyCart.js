import {Localizer} from "../share/Localizer.js";

export class TemplateEmptyCart {
  _local = new Localizer();
  getEmptyCart() {
    return `
    <div class="modal-header">
      <h4 class="modal-title" id="exampleModalLongTitle">${this._local.get('cart')}</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    
    <div class="modal-body d-flex align-items-center flex-column"">
      <img class="empty-cart-image w-75 py-5" src="app/graphics/empty_cart.jpg"
        alt="${this._local.get('empty_cart_picture')}">     
      <div class="d-flex justify-content-end w-100 pr-3">
        <a href="http://www.freepik.com">Designed by Freepik</a>
      </div>
      <h5>${this._local.get('cart_is_empty')}</h5>
    </div>
    
    <div class="d-flex justify-content-center modal-footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal">${this._local.get('continue_shopping')}</button>
    </div>

`
  }
}