export class Helper {
  _loadImg(imgSrc, func) {
    const img = document.createElement('img');
    document.body.style.cursor = 'wait';

    img.onload = () => {
      document.body.style.cursor = null;
      if(func) { func(); }
    };

    img.onerror = () => {
      document.body.style.cursor = null;
      if(func) { func(); }
    };

    img.src = imgSrc;
  }
}