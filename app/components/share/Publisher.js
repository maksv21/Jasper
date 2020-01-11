export class Publisher {
  constructor() {
    if (!Publisher.instance) {
      this._subscribes = {};
      this.ctrls = {
        subscribe: this.subscribe.bind(this),
        notify: this.notify.bind(this),
        removeSubscribe: this.removeSubscribe.bind(this),
      };

      Publisher.instance = this;
    }

    return Publisher.instance;
  }

  static instance = false;

  subscribe(event, func, options) {
    if (!this._subscribes.hasOwnProperty(event)) {
      this._subscribes[event] = new Set();
    }
    this._subscribes[event].add({func: func, options: options});
  }

  notify(event, data) {
    this._existenceCheck(event);
    const set = this._subscribes[event];

    set.forEach(item => {
      item.func(data);
      if (item.options && item.options.once) {
        set.delete(item);
      }
    });
  }

  removeSubscribe(event, func, id) {
    this._existenceCheck(event);

    this._subscribes[event].forEach(item => {
      if ((func && item.func === func) || (id !== undefined && item.options && item.options.id === id)) {
        this._subscribes[event].delete(item);
      }
    });
  }

  _existenceCheck(event) {
    if (!this._subscribes.hasOwnProperty(event)) {
      this._subscribes[event] = new Set();
    }
  }


}