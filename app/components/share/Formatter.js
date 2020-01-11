import {Localizer} from "./Localizer.js";

export class Formatter {
  constructor() {
    if (!Formatter.instance) {
      this._local = new Localizer();
      Formatter.instance = this;
    }

    return Formatter.instance;
  }

  static instance = false;

  formatName(name) {
    return name.split(' ')
      .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()) // charAt used for empty strings
      .join(' ');
  }

  formatAge(birthdayDate, detailsLevel) {
    let result;
    const currentDate = new Date();
    if (birthdayDate > currentDate) {
      result = 'Not born yet'
    } else {
      const differenceDate = new Date(currentDate - birthdayDate);

      const years = differenceDate.getFullYear() - 1970;
      const months = differenceDate.getMonth();
      const weeks = differenceDate.getDate() / 7 ^ 0;
      const days = differenceDate.getDate();

      if (detailsLevel === 1) {
        if (years) {
          result = this._format(years, 'years');
        } else if (months) {
          result = this._format(months, 'months');
        } else if (weeks) {
          result = this._format(weeks, 'weeks');
        } else if (days) {
          result = this._format(days, 'days');
        }

      } else {

        if (years && months) {
          result = this._format(years, 'years') + ' ' + this._format(months, 'months');

        } else if (years && weeks) {
          result = this._format(years, 'years') + ' ' + this._format(weeks, 'weeks');

        } else if (years && days) {
          result = this._format(years, 'years') + ' ' + this._format(days, 'days');

        } else if (years) {
          result = this._format(years, 'years');

        } else if (months && weeks) {
          result = this._format(months, 'months') + ' ' + this._format(weeks, 'weeks');

        } else if (months && days) {
          result = this._format(months, 'months') + ' ' + this._format(days, 'days');

        } else if (months) {
          result = this._format(months, 'months');

        } else if (weeks && days) {
          result = this._format(weeks, 'weeks') + ' ' + this._format(days, 'days');

        } else if (weeks) {
          result = this._format(weeks, 'weeks');

        } else if (days) {
          result = this._format(days, 'days');
        }
      }

    }

    return result;
  }

  _format(value, name) {
    return value + ' ' + this._local.get(name, value);
  }

  formatColor(value) {
    return value.split('-').map(item => this._local.get(item)).join(', ');
  }
}