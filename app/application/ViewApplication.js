import {TemplateApplication} from "./TemplateApplication.js";

export class ViewApplication {
  constructor() {
    document.body.innerHTML = TemplateApplication.getApplicationTemplate();
    document.ondragstart = () => false;

    window.addEventListener('beforeunload', this._closingAppAnim);
  }


  _closingAppAnim() {
    document.querySelector('.navbar').classList.add('hidden');
    document.body.style.opacity = '0';
  }
}