import {TemplatePage} from "./TemplatePage.js";

export class ViewPageRenderer {
  _container = document.querySelector('.detailed-info');
  _productsContainer = document.querySelector('.products');
  _pageTemplate = new TemplatePage();

  renderPage({HTML, title, backBtnFunc}) {
    this._container.classList.add('anim-in');
    this._container.addEventListener('animationend', () => this._container.classList.remove('anim-in'), {once: true});

    this._container.innerHTML = this._pageTemplate.getPage({title, HTML});

    this._container.querySelector('.back-btn').addEventListener('click', backBtnFunc);
  }

  remove(scroll) {
    this._container.classList.add('anim-out');

    this._container.addEventListener('animationend', () => {
      this._container.innerHTML = null;
      this._container.classList.remove('anim-out');
    }, {once: true});

    this._productsContainer.classList.remove('anim-out');
    this._productsContainer.classList.remove('hidden');

    if (Number.isInteger(scroll)) {
      document.documentElement.scrollTo({top: scroll, behavior: "smooth"});
    }
  }

  hideProducts() {
    this._productsContainer.classList.add('anim-out');

    this._productsContainer.addEventListener('animationend', () => {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';

      this.scrollTop(() => {
        this._productsContainer.classList.add('hidden');
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
      })
    }, {once: true});
  }

  getContentContainer() {
    return this._container.querySelector('.page-content');
  }

  getScroll() {
    return document.documentElement.scrollTop;
  }

  scrollTop(func) {
    const interval = setInterval(() => {
      if (document.documentElement.scrollTop === 0) {
        clearInterval(interval);
        if(func) { func(); }
      }

      const scrollBy = -document.documentElement.scrollTop / 7;
      document.documentElement.scrollBy(0, scrollBy);
    }, 15)
  }
}