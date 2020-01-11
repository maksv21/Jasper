import {Localizer} from "../share/Localizer.js";

export class TemplateNothing {
  _local = new Localizer();
  getNothing() {
    return `
    <div class="main-elem-anim d-flex align-items-center justify-content-center flex-column h-100 w-100">
      <img class="no-search-image" src="app/graphics/no_found.jpg" alt="${this._local.get('nothing_founded')}">
        <a href="http://www.freepik.com">Designed by Freepik</a>
      <h3>${this._local.get('nothing_founded')}</h3>
    </div>
`
  }
}
