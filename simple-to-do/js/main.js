const input = document.querySelector('.to-do-input');
const list = document.querySelector('.to-do-list');
const todos = initTodos();

list.innerHTML = compileList();
input.addEventListener('keypress', keypressHandler);
list.addEventListener('click', clickHandler);

function initTodos() {
  const store = localStorage.getItem('todos');
  if (store) {
    return store.split(',');
  } else {
    return [];
  }
}

function keypressHandler(event) {
  if (event.key === 'Enter') {
    todos.push(input.value);
    input.value = '';
    list.innerHTML = compileList();
  }
}

function clickHandler(event) {
  if (event.target.classList.contains('to-do-delete')) {
    const items = [...document.querySelectorAll('.to-do-item')];
    const indexOfDeletedItem = items.indexOf(event.target.parentNode);
    todos.splice(indexOfDeletedItem, 1);
    list.innerHTML = compileList();
  }
}

function compileList() {
  localStorage.setItem('todos', todos);
  if (todos.length > 0) {
    let listHtml = '';
    for (let todo of todos) {
      listHtml = listHtml + todoTemplate(todo);
    }
    return listHtml;
  } else {
    return '<li class="to-do-item">Nothing to show</li>';
  }
}

function todoTemplate(text) {
  return `
        <li class="to-do-item">
          ${text}
          <button class="to-do-delete">❌</button>
        </li>
      `;
}