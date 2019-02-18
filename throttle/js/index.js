(function(){
  const button = document.querySelector('.button'); // Находим кнопку в DOM.
  const delay = 2000; // Обработчик клика сработает не чаще, чем delay.
  /* Ставим на кнопку обработчик клика.
  При этом функция plusOne, вызываемая по клику создаётся функцией dump,
  вызываемой здесь же для того, чтобы функция plusOne хранила текущее значение
  времени нажатия кнопки и прочее в своём контексте: */
  button.addEventListener('click', throttle(plusOne, delay));
  
  function plusOne(e) { // Функция для увеличения числа на кнопке на 1. Если > 100, то 0.
    e.target.innerText = (+e.target.innerText < 100) ? +e.target.innerText + 1 + '' : '0';
  }
  
  function throttle(fn, delay) { // Функция-"конструктор" для обработчика клика
    // Начальное значение времени = 0, из-за этого в первый раз клик точно сработает:
    let now = 0;
    let timeout; // Идентификатор setTimeout, пока = undefined
    // Возврадаем функцию обработки клика. e - объект event, передастся из слушателя:
    return function(e) { 
      /* setTimeout нужен здесь, чтобы обрабатывать только последний клик в течение
      периода ожидания. Поэтому предварительно нужно очистить предыдущий setTimeout,
      он уже не актуален и не должен повлиять на счётчик на кнопке: */
      if(timeout) {
        clearTimeout(timeout);
      };
      /* Если задержка уже закончилась, то можно увеличивать счётчик на кнопке.
      Ну или шире, выполнять любую функцию, кот. мы создаем с помощью dump */
      if (Date.now() - delay > now) {
        now = Date.now(); // Перезаписываем время последнего обновления.
        fn(e); // Вызываем обработчик клика.
      }
      else {
        /* Если же задержка ещё действует, то ставим setTimeout на последний
        клик и опять перезаписываем время последнего срабатывания.*/
        timeout = setTimeout(function(e) {
          now = Date.now(); 
          fn(e);
        }, delay - (Date.now() - now), e);
      }
    }
  }
})();