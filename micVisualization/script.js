/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable one-var */
const
  body = document.querySelector('body'),
  num = 32,
  array = new Uint8Array(num * 2),
  width = 10;

let
  context,
  logo,
  myElements,
  analyzer,
  src,
  height;

window.addEventListener('click', () => {
  if (context) return;
  body.querySelector('h1').remove();
  for (let i = 0; i < num; i++) {
    logo = document.createElement('div');
    logo.className = 'logo';
    logo.style.background = 'red';
    logo.style.minWidth = `${width}px`;
    body.appendChild(logo);
  }

  myElements = document.getElementsByClassName('logo');
  context = new AudioContext();
  analyzer = context.createAnalyser();

  navigator.mediaDevices.getUserMedia({
    audio: true,
  }).then((stream) => {
    src = context.createMediaStreamSource(stream);
    src.connect(analyzer);
    loop();
  }).catch((err) => {
    alert(`${err}\r\n Страница будет обновлена`);
    location.reload();
  });
});

function loop() {
  window.requestAnimationFrame(loop);
  analyzer.getByteFrequencyData(array);
  for (let i = 0; i < num; i++) {
    height = array[i + num];
    myElements[i].style.minHeight = `${height}px`;
    myElements[i].style.opacity = 0.008 * height;
  }
}
