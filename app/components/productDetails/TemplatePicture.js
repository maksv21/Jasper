import {Localizer} from "../share/Localizer.js";

export class TemplatePicture {
  _local = new Localizer();
  getPictureTemplateBody(title) {
    return `
    <div class="modal fade product-picture-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">${title}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"></div>
          <div class="d-flex justify-content-center modal-footer">
            <button class="buy-btn btn btn-success btn-lg">
              <span class="d-flex align-items-center">
                <i class="material-icons">add_shopping_cart</i>
                <span class="pl-1" data-id="0">${this._local.get('add_to_cart')}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  getPictureTemplate(image) {
    return `
    <div class="d-flex align-items-center flex-column">
      <img src="${image}" class="w-100 detailed-info-big-picture" 
        alt="${this._local.get('pet_picture')}"
        onerror="this.onerror=null;this.src='app/graphics/no_image.jpg';">
      <button class="btn btn-link open-big-picture-btn">${this._local.get('open_big_picture')}</button>
    </div>
`
  }
}