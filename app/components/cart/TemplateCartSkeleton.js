import {Localizer} from "../share/Localizer.js";

export class TemplateCartSkeleton {
  _local = new Localizer();
  getCartSkeleton() {
    return `
    <div class="modal fade cart-container" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content"></div>
      </div>
    </div>
`
  }
}