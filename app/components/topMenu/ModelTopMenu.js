export class ModelTopMenu {
  prepareTitleArr(arr) {
    let id = 0;
    return arr.map(item => {
      const result = {
        title: item.title,
        isButton: Boolean(item.action),
        id: id,
      };

      id += 1;

      return result;
    })
  }

  changeSorting(value) {
    const settings = JSON.parse(localStorage.getItem('jasper_settings'));
    if(settings.sorting !== value) {
      settings.sorting = value;
      localStorage.setItem('jasper_settings', JSON.stringify(settings));

      return true;
    } else {
      return false;
    }
  }

  getCurrentSorting() {
    const settings = JSON.parse(localStorage.getItem('jasper_settings'));
    return settings.sorting;
  }
}