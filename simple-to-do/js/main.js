function init(key) {
  const store = localStorage.getItem(key);
  if (store) {
    return store.split(',');
  } else {
    return [];
  }
}

function keypressHandler(event) {
  if (event.key === 'Enter' && input.value !== '') {
    todos.push(input.value);
    input.value = '';
    list.innerHTML = compileList();
  }
}

function doneItem() {
  const items = [...document.querySelectorAll('.to-do-item')];
  const indexOfDoneItem = items.indexOf(event.target.parentNode);
  if (done.includes(items[indexOfDoneItem])) return;
  done.push(items[indexOfDoneItem]);
  list.innerHTML = compileList();
}

function deleteItem() {
  const items = [...document.querySelectorAll('.to-do-item')];
  const indexOfDeletedItem = items.indexOf(event.target.parentNode);
  todos.splice(indexOfDeletedItem, 1);
  list.innerHTML = compileList();
}

function clickHandler(event) {
  if (event.target.classList.contains('to-do-done')) {
    doneItem();
  }
  if (event.target.classList.contains('to-do-delete')) {
    deleteItem();
  }
}

function compileList() {
  localStorage.setItem('todos', todos);
  localStorage.setItem('done', done);
  if (todos.length > 0) {
    let listHtml = '';
    for (let todo of todos) {
      listHtml = listHtml + todoTemplate(todo);
    }
    return listHtml;
  }
  return '<li class="to-do-item">Nothing to show</li>';
}

function todoTemplate(text) {
  return `
        <li class="to-do-item">
          <span class="to-do-text">${text}</span>
          <button class="to-do-done">✔️</button>
          <button class="to-do-delete">❌</button>
        </li>
      `;
}

const input = document.querySelector('.to-do-input');
const list = document.querySelector('.to-do-list');
const todos = init('todos');
const done = init('done');

list.innerHTML = compileList();
input.addEventListener('keypress', keypressHandler);
list.addEventListener('click', clickHandler);
