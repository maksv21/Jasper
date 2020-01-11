import {ViewPageRenderer} from "./ViewPageRenderer.js";

export class ControllerPageRenderer {
  constructor({notify, subscribe, removeSubscribe}) {
    this._view = new ViewPageRenderer();
    this._notify = notify;
    this._subscribe = subscribe;
    this._removeSubscribe = removeSubscribe;
    this._backData = [];

    this._subscribe('render-page', this._renderPageManager.bind(this));
    this._subscribe('get-renderer-container', (func) => func(this._view.getContentContainer()));
  }

  _renderPageManager({title, categoryTitle = title, HTML, afterLoadFunc, afterCloseFunc,}) {
    // categoryTitle isn't comparing cause it is a object
    if(this._currentPage
    && title === this._currentPage.title
    && HTML === this._currentPage.HTML) {
      return;
    }

    let backBtnFunc = null;
    if (this._currentPage) {
      this._view.scrollTop();
      if(this._currentPage.afterCloseFunc) { this._currentPage.afterCloseFunc(); }

      this._backData.push(this._currentPage);
      backBtnFunc = () => {
        this._view.scrollTop();
        const backData = this._backData.pop();
        this._renderPage(backData);
        this._currentPage = backData;

        if(backData) { backData.afterLoadFunc() }
      };
    } else {
      this._firstScroll = this._view.getScroll();
      this._notify('get-title', (title) => this._firstTitle = title);
      this._notify('hide-sorting');

      this._view.hideProducts();
    }

    this._currentPage = {title, categoryTitle, HTML, afterLoadFunc, afterCloseFunc, backBtnFunc,};
    this._renderPage(this._currentPage);
  }

  _renderPage(pageObj) {
    this._view.renderPage({
      HTML: pageObj.HTML, title: pageObj.title,
      backBtnFunc: () => {
        if(pageObj.backBtnFunc) {
          pageObj.backBtnFunc();
        } else {
          this._closeLastPage();
        }

        if(pageObj.afterCloseFunc) {pageObj.afterCloseFunc();}
      },
    });


    this._notify('show-title', pageObj.categoryTitle);
    this._subscribe('render-goods', this._removePage.bind(this), {id: this});

    if(pageObj.afterLoadFunc) {pageObj.afterLoadFunc();}
  }

  _removePage(scroll) {
    this._view.remove(scroll);
    this._removeSubscribe('render-goods', null, this);
    this._currentPage = null;
    this._backData = [];
  }

  _closeLastPage() {
    this._notify('goods-loaded');
    this._notify('show-title', this._firstTitle);
    this._notify('show-sorting');
    this._removePage(this._firstScroll);
  }
}