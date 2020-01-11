import {Localizer} from "../share/Localizer.js";

export class ModelCheckout {
  _local = new Localizer();

  prepareOrderData(orderData) {
    const lang = JSON.parse(localStorage.getItem('jasper_settings')).lang;
    if (lang !== 'en') {
      const goods = JSON.parse(sessionStorage.getItem('jasper_products_alt_lang'));

      orderData.arr.forEach(item => {
        const productObj = goods.find(i => i.id === item.id);
        item.title = productObj.breed;
      });
    }

    return orderData;
  }

  prepareMessage(form, orderId, orderData) {
    return `${this._local.get('msg_info')}
${this._local.get('msg_name')}: ${form.name.value}
${this._local.get('msg_phone')}: 0${form.phone.value}
${this._local.get('msg_email')}: ${form.email.value}
${this._local.get('msg_street')}: ${form.street.value}
${this._local.get('msg_city')}: ${form.city.value}${form.notes.value
      ? '\n' + this._local.get('msg_notes') + ': ' + form.notes.value : ''}
${this._local.get('msg_order_id')}: ${orderId}
${this._local.get('msg_total_price')}: ${orderData.price}


${this._local.get('msg_order')}
${this._formatOrderData(orderData.arr)}
`
  }

  _formatOrderData(arr) {
    return arr.map((item, index) => {
      return `${index + 1}
${this._local.get('msg_item_title')}: ${item.title}
${this._local.get('msg_item_id')}: ${item.id}
${this._local.get('msg_item_price')}: ${item.price}
`
    }).join('');
  }

  generateOrderId() {
    return Date.now();
  }

  sendMessage(msg) {
    let chat_id = localStorage.getItem('chat_id');
    chat_id = chat_id ? chat_id : '-377489566';
    return fetch(`https://api.telegram.org/bot1008500080:AAFwcLw8I_1HQHx2e7LmDVW9-LQV1CFJ3D0/sendMessage?chat_id=${chat_id}&parse_mode=Markdown&text=` + encodeURIComponent(msg));
  }

  clearCart() {
    localStorage.setItem('jasper_cart', '[]');
  }
}

