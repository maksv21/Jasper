import {Localizer} from "../share/Localizer.js";
import {Formatter} from "../share/Formatter.js";

export class ModelGoods {
  _local = new Localizer();
  _formatter = new Formatter();
  _sortingFuncs = {
    'price-high': (a, b) => b.price - a.price,
    'price-low': (a, b) => a.price - b.price,
    'age-high': (a, b) => a.birth_date - b.birth_date,
    'age-low': (a, b) => b.birth_date - a.birth_date,
  };

  loadGoods() {
    this.allProductsArray = JSON.parse(sessionStorage.getItem('jasper_products'));
    return this.allProductsArray;
  }

  prepareGoodsArr(start = 0, end, goodsArray, skipSorting) {
    const settings = JSON.parse(localStorage.getItem('jasper_settings'));

    if(!skipSorting){
      goodsArray.sort(this._sortingFuncs[settings.sorting]);
    }

    return goodsArray.slice(start, end).map(product => {
      return {
        imgSrc: product.image,
        title: this._formatter.formatName(product.breed),
        price: `$${product.price}`,
        option1: this._local.get(product.gender.toLowerCase()),
        option2: this._formatter.formatAge(product.birth_date, 1),
        id: product.id,
      }
    });
  }

  calculatePagination(currentPage, pagesCount) {
    const result = [];
    const buttonsCount = 9;// must be odd, correct work only with 9

    if (pagesCount > 1) {
      let btnCnt = (buttonsCount % 2) ? buttonsCount : buttonsCount + 1; // make odd
      btnCnt = (btnCnt - 3) / 2; // (all buttons(9) - first - second - current) / 2
      result.push({value: '1', page: 1,}); // add first page

      let k = currentPage - btnCnt;
      if (pagesCount - currentPage < btnCnt + 1) {
        /* Value of k must be value of second btn, for example we must get next result:
        [1, 8, 9, 10, 11, 12, 999], current page === 10, then k = 10 - 2 = 8;
        [1, 8, 9, 10, 11, 12, 13], current page === 13, then k = 13 - 5 = 8;*/
        k -= ((btnCnt + 1) - (pagesCount - currentPage));
      }

      while (k <= pagesCount && result.length < buttonsCount - 1) {
        if (k > 1) {
          result.push({value: String(k), page: k,});
          k += 1;
        } else {
          k = 2; // if lower than 0, start from second page
        }
      }

      // add last page
      if (result[result.length - 1].page !== +pagesCount) {
        result.push({value: String(pagesCount), page: pagesCount,});
      }

      if (pagesCount > 9) {
        // formatting result
        if (result[1].page !== 2) {
          result[1].value = '...'
        }
        if (result[result.length - 2].page !== result[result.length - 1].page - 1) {
          result[result.length - 2].value = '...'
        }
      }

      // add current page
      result.forEach(item => {
          if (item.page === +currentPage) {
            item.class = 'active';
            item.page = 0;
          }
        }
      );
    }

    return result;
  }
}

