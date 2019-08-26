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
    this.inImage = document.querySelector('.track');
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
      // this.outImageFile = new File([convert(e.target.result)], '', { type: 'audio/mpeg' });
      this.outImageFile = new File([e.target.result], '', { type: 'audio/mpeg' });
      // this.displayImage(this.outImage, this.outImageFile);
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

var audio, context, analyser, src, array, logo;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");

window.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
    }else{
        audio.pause();
    }
}

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.minHeight = (array[40])+"px";
    logo.width =  (array[40])+"px";
}
