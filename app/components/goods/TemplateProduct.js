import {Localizer} from "../share/Localizer.js";

export class TemplateProduct {
  _local = new Localizer();
  getProductTemplate({imgSrc, title, option1, option2, price, id}) {
    return `
    <div class="card product-card flex-fill" data-id="${id}">
      <div class="product-picture-container">
        <a href="./?product_id=${id}" onclick="return false">
          <img src="${imgSrc}" class="card-img-top product-picture" 
          alt="${this._local.get('pet_picture')}" 
          onerror="this.onerror=null;this.src='app/graphics/no_image.jpg';">
        </a>
      </div>
      <div class="card-body">
        <a href="./?product_id=${id}" onclick="return false">
        <span class="product-card-text">
          <h6 class="card-text">${title}</h6>
          <p class="card-text"><small class="text-muted product-card-small-text">${option1} / ${option2}</small></p>
        </span>
        </a>
        <h3 class="card-title">${price}</h3>
      </div>
    </div>`
  }

  getEnd() {
    // FIXME: workaround for one size for cards; it fills free space after cards
    return `
    <div class="card product-card flex-fill" style="opacity: 0"></div>
    <div class="card product-card flex-fill" style="opacity: 0"></div>
    <div class="card product-card flex-fill" style="opacity: 0"></div>
    <div class="card product-card flex-fill" style="opacity: 0"></div>
    `
  }
}
