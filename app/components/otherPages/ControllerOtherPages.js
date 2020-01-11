import {ViewOtherPages} from "./ViewOtherPages.js";

export class ControllerOtherPages {
  constructor({subscribe, notify}) {
    this._view = new ViewOtherPages();

    subscribe('render-other-page', page => {
      switch (page) {
        case 'about': {
          notify('render-page', {
            HTML: this._view.getAboutTemplate(),
            title: 'About'
          });
          break;
        }

        case 'page': {
          notify('render-page', {
            HTML: this._view.getPageTemplate(),
            title: 'Page'
          });
          break;
        }
      }
    })
  }
}