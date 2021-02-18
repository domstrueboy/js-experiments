import input from './input.js';

const CORRECT_OUTPUT = 23;

const inputEl = document.querySelector('.input');
const methodEl = document.querySelector('select[name=method]');
const actionEl = document.querySelector('.action__button');
const outputEl = document.querySelector('.output');

inputEl.textContent = JSON.stringify(input, null, '  ');
actionEl.addEventListener('click', run);

const outputMutationCallback = function(mutationsList, observer) {
  const value = +mutationsList[0].addedNodes[0].data;
  if (value === CORRECT_OUTPUT) {
    outputEl.classList.remove('wrong-output');
    outputEl.classList.add('correct-output');
  } else {
    outputEl.classList.remove('correct-output');
    outputEl.classList.add('wrong-output');
  }
}

const observer = new MutationObserver(outputMutationCallback);
observer.observe(outputEl, { childList: true });

async function run() {
  const { default: method } = await import(`./methods/${methodEl.value}.js`);
  outputEl.innerText = method();
}
