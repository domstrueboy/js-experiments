const input = document.querySelector('#input'),
      output1 = document.querySelector('#output1'),
      output2 = document.querySelector('#output2');

input.addEventListener('change', inputHandler);

function inputHandler () {
  const val = parseInt(input.value, 10);
  if (Number.isNaN(val)) {
    input.value = '';
  } else {
    input.value = val;
    output1.textContent = factorialWithRecursion(val);
    output2.textContent = factorialWithLoop(val);
  }
  return;
}

function factorialWithRecursion (x) {
  if (x <= 1) return 1;
  return factorialWithRecursion(x - 1) * x;
}

function factorialWithLoop (x) {
  let sum = 1;
  for (let i = 1; i <= x; i++ ) {
    sum *= i;
  }
  return sum;
}