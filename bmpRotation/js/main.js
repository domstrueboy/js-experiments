/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import convert from './convert.js';

class Main {
  constructor() {
    this.selectorsAssign();
    this.listenersAssign();
  }

  selectorsAssign() {
    this.input = document.querySelector('input');
    this.inImage = document.querySelector('.in-image');
    this.outImage = document.querySelector('.out-image');
    this.downloadLink = document.querySelector('.download-link');
  }

  listenersAssign() {
    this.input.addEventListener('change', () => {
      this.processImage();
    });
  }

  processImage() {
    [this.inImageFile] = this.input.files;
    this.displayImage(this.inImage, this.inImageFile);

    const reader = new FileReader();
    reader.readAsArrayBuffer(this.inImageFile);
    reader.onload = (e) => {
      this.outImageFile = new File([convert(e.target.result)], '', { type: 'image/bmp' });
      this.displayImage(this.outImage, this.outImageFile);
      this.showFileLink(this.outImageFile);
    };
  }

  displayImage(image, fileToDisplay) {
    image.src = window.URL.createObjectURL(fileToDisplay);
    image.onload = () => {
      window.URL.revokeObjectURL(this.src);
    };
  }

  showFileLink(fileToDisplay) {
    this.downloadLink.href = window.URL.createObjectURL(fileToDisplay);
    this.downloadLink.style.display = 'inline';
  }
}

window.main = new Main();
