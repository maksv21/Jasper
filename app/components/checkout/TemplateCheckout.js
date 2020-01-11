import {Localizer} from "../share/Localizer.js";

export class TemplateCheckout {
  _local = new Localizer();

  getCheckoutPage(price) {
    return `
    <div class="d-flex justify-content-center w-100">
    <form class="w-75">
      <div>
        <h4>${this._local.get('сontact_details')} </h4>
        <label for="frmNameA" class="mb-1">${this._local.get('name')}</label>
        <input name="name" type="text" class="form-control" id="frmNameA" 
        placeholder="${this._local.get('full_name')}" pattern="[A-zА-я '-]+" required autocomplete="name">
      
        <label for="frmPhoneNumA" class="mb-1 mt-2">${this._local.get('phone_number')}</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">+380</span>
          </div>
          <input name="phone" id="frmPhoneNumA" type="tel" maxlength="9" class="form-control" 
          placeholder="000000000" pattern="[0-9]{9}" required autocomplete="tel" tabindex="1">
        </div>
      
        <label for="frmEmailA" class="mb-1 mt-2">${this._local.get('email')}</label>
        <input name="email" type="email" class="form-control" id="frmEmailA" 
        placeholder="user1900@gmail.com" required autocomplete="email">
      </div>
      
      <hr>
      
      <div>
        <h4>${this._local.get('delivery_information')}</h4>
              
        <label for="frmAddressS" class="mb-1 mt-2">${this._local.get('address')}</label>
        <input name="street" type="text" class="form-control" id="frmAddressS" 
        placeholder="${this._local.get('street_example')}" pattern="[A-zА-я '0-9.,/\-]+" required autocomplete="shipping street-address">
      
        <label for="frmCityS">${this._local.get('сity')}</label>
        <input  name="city" class="form-control" required id="frmCityS" 
        placeholder="${this._local.get('city_example')}" required autocomplete="shipping locality">
               
        <label for="notes-input" class="mb-1 mt-2">${this._local.get('notes')}</label>
        <textarea name="notes" class="form-control" aria-label="With textarea" id="notes-input" 
        placeholder="${this._local.get('notes_to_delivery')}" maxlength="500"></textarea>
      </div>
      
      <hr>
      
      <div>
        <h4>${this._local.get('order')}</h4>
        <div class="order-container"></div>
      </div>
      
      <hr>
      
      <div class="d-flex justify-content-between align-items-end">
        <div class="d-flex align-items-center">
          <span class="total-price">${this._local.get('total_price')}:</span> 
          <h2 class="total-price ml-4">${price}</h2>
        </div>
        <input type="submit" class="btn btn-success btn-lg checkout" value="${this._local.get('complete_order')}">
      </div>
      
      
        
    </form>
    </div>
    `
  }

  getSuccess(id) {
    return `
    <div class="main-elem-anim d-flex align-items-center justify-content-center h-100 w-100">
      <span class="d-flex align-items-center h-100">
        <h3 class="material-icons">check_circle</h3>
        <h5 class="pl-1">${this._local.get('order_success')}</h5>
        <h4 class="pl-1">${id}</h4>
      </span>
    </div>
    `
  }
}