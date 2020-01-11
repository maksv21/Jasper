import {TemplatePage} from "./TemplatePage.js";
import {TemplateAbout} from "./TemplateAbout.js";

export class ViewOtherPages {
  getAboutTemplate() {
    return TemplateAbout.getPage();
  }

  getPageTemplate() {
    return TemplatePage.getPage();
  }
}