import {Localizer} from "../share/Localizer.js";

export class TemplateOrderItem {
  _local = new Localizer();
  getItem({image_small, title, price, id}) {
    return `
      <div class="card mt-2">
        <div class="checkout-order-item-body card-body d-flex justify-content-start align-items-center">
          <div class="cart-item-img-container mx-3">
            <img src="${image_small}" class="checkout-order-item-img" 
              alt="${this._local.get('pet_picture')}"
              onerror="this.onerror=null;this.src='app/graphics/no_image.jpg';">
          </div>
          <h5 class="card-title mx-3 w-100"><span>${title} (${id})</span></h5>
          <h3 class="card-title mx-3">${price}</h3>
        </div>
      </div>
`
  }
}