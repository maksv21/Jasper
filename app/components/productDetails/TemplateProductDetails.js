import {Localizer} from "../share/Localizer.js";

export class TemplateProductDetails {
  _local = new Localizer();

  getTemplateProductDetails({image_small, price, copyright}) {
    return `
    <div class="detailed-info-content px-4">
      <div class="d-flex align-items-between">
        <div class="detailed-info-product-picture-container">
            <img src="${image_small}" class="product-picture" 
            alt="${this._local.get('pet_picture')}"
            onerror="this.onerror=null;this.src='app/graphics/no_image.jpg';">
          ${copyright}
        </div>
        
        <div class="d-flex align-items-center flex-column w-100 px-5">
          <div class="card w-100">
            <div class="card-body">
              <h3>${price}</h3>
              <div class="d-flex align-items-center">
                <button class="btn btn-lg buy-btn"></button>
              </div>
            </div>
          </div>
      
          <div class="card w-100">
            <div class="card-body">
              <h5 class="card-title">${this._local.get('payment')}</h5>
              <p class="card-text">${this._local.get('payment_info')}</p>
            </div>
          </div>

          <div class="card w-100">
            <div class="card-body">
              <h5 class="card-title">${this._local.get('delivery')}</h5>
              <p class="card-text">${this._local.get('delivery_info')}</p>
            </div>
          </div>
        </div>   
          
      </div>
          
      <hr class="my-4">
      
      <div class="d-flex align-items-center flex-column">
        <h3 class="d-flex align-items-start w-75">${this._local.get('pet_info')}</h3>
        <ul class="list-group w-75"></ul>
      </div>
    </div>    
`
  }

  getTableTemplate([title, value]) {
    return `  
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${title}:</span> 
      <span>${value}</span>
    </li>`
  }

  getBuyBtn() {
    return `
    <span class="d-flex align-items-center">
      <i class="material-icons">add_shopping_cart</i>
      <span class="pl-1">${this._local.get('add_to_cart')}</span>
    </span>
    `
  }

  getAlreadyInCart() {
    return `
    <span class="d-flex align-items-center">
      <i class="material-icons">check_circle</i>
      <span class="pl-1">${this._local.get('already_in_cart')}</span>
    </span>
    `
  }
}
