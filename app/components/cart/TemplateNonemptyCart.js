import {Localizer} from "../share/Localizer.js";

export class TemplateNonemptyCart {
  _local = new Localizer();

  getCart() {
    return `
    <div class="modal-header">
      <h4 class="modal-title" id="exampleModalLongTitle">Cart</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body"></div>
    <div class="d-flex justify-content-between modal-footer align-items-end">
      <button type="button" class="btn btn-light" data-dismiss="modal">${this._local.get('continue_shopping')}</button>
      <div>
          <div class="d-flex align-items-end flex-column">
            <div class="d-flex justify-content-between align-items-end w-100">
              <span>${this._local.get('total_price')}:</span> 
              <h2 class="total-price ml-4">0</h2>
            </div>
            <button class="btn btn-success btn-lg w-100 checkout">${this._local.get('checkout')}</button>
          </div>
      </div>
    </div>
    `
  }

  getProduct({image, title, price, id}) {
    return `
    <div class="cart-item collapse show mt-2" data-id="${id}">
      <div class="card">
        <div class="cart-item-body card-body d-flex justify-content-start align-items-center">
          <i class="remove-btn material-icons text-btn" data-toggle="collapse" data-target=".cart-item[data-id='${id}'"
           aria-expanded="false" aria-controls="collapseExample">remove_circle</i>
          <div class="cart-item-img-container mx-3">
            <object data="${image}" type="image/png" class="cart-item-img product-picture open-product-btn">
              <img src="app/graphics/no_image.jpg" class="cart-item-img product-picture open-product-btn" 
              alt="${this._local.get('pet_picture')}">
            </object>
          </div>
          <div class="mx-3 w-100">
            <h5 class="card-title"><span class="btn-link text-btn open-product-btn">${title}</span></h5>
            <h6 class="card-subtitle">(${id})</h6>
          </div>
          <div class="mx-3 d-flex align-items-end flex-column">
            <span class="text-muted small">${this._local.get('price')}</span>
            <h3 class="card-title">${price}</h3>
          </div>
        </div>
      </div>
    </div>
`
  }
}