import {TemplateProductDetails} from "./TemplateProductDetails.js";
import {TemplatePicture} from "./TemplatePicture.js";
import {Helper} from "../share/Helper.js";

export class ViewProductDetails {
  _template = new TemplateProductDetails();
  _pictureTemplate = new TemplatePicture();
  _productsContainer = document.querySelector('.products');
  _helper = new Helper();

  getProductDetailsPage({productObj, infoArr}) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = this._template.getTemplateProductDetails(productObj);

    tempContainer.querySelector('.list-group').innerHTML = infoArr.map(item => {
      return this._template.getTableTemplate(item);
    }).join('');

    tempContainer.insertAdjacentHTML('beforeend', this._pictureTemplate.getPictureTemplateBody(productObj.title));

    return tempContainer.innerHTML;
  }

  addListeners({container, imgEvent, buyEvent}) {
    this._container = container;
    container.querySelector('.product-picture').addEventListener('click', imgEvent);
    container.querySelectorAll('.buy-btn').forEach(item => item.addEventListener('click', buyEvent));
  }

  renderBuyBtn(inCart) {
    this._container.querySelectorAll('.buy-btn').forEach(item => {
      if (inCart) {
        item.innerHTML = this._template.getAlreadyInCart();
        item.classList.remove('btn-success');
        item.classList.add('btn-light');
      } else {
        item.innerHTML = this._template.getBuyBtn();
        item.classList.remove('btn-light');
        item.classList.add('btn-success');
      }
    });
  }

  remove(scroll) {
    this._container.classList.add('anim-out');

    this._container.addEventListener('animationend', () => {
      this._container.innerHTML = null;
      this._container.classList.remove('anim-out');
    }, {once: true});

    this._productsContainer.classList.remove('anim-out');
    this._productsContainer.classList.remove('hidden');

    if (scroll) {
      document.documentElement.scrollTo({top: scroll, behavior: "smooth"});
    }
  }

  renderProductPicture(imgUrl) {
    this._helper._loadImg(imgUrl, () => {
      const modalBody = this._container.querySelector('.modal-body');
      modalBody.innerHTML = this._pictureTemplate.getPictureTemplate(imgUrl);
      $('.product-picture-modal').modal();

      this._container.querySelector('.open-big-picture-btn').addEventListener('click',
        () => window.open(imgUrl));
    })
  }

  hideProductPicture(func) {
    if ($('.product-picture-modal').is(':visible')) {
      $('.product-picture-modal').modal('hide').one('hidden.bs.modal', func);
    } else {
      func();
    }
  }

  setUrl(id) {
    let url = window.location.href;
    url = url.replace(/\?product_id=\d*/g, '');
    const newUrl = id ? url + '?product_id=' + id : url;
    window.history.pushState("", "", newUrl);
  }
}