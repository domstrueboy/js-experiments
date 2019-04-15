import Todo from './modules/Todo.js';

const input = document.querySelector('.to-do-input');
const list = document.querySelector('.to-do-list');

function removeInstance() {
  const indexOfDeletedItem = todos.indexOf(this);
  todos.splice(indexOfDeletedItem, 1);
  localStorage.setItem('todosJSON', JSON.stringify(todos));
}

function getTodos() {
  const oldStoredTodos = localStorage.getItem('todos');
  if (oldStoredTodos !== null) {
    localStorage.removeItem('todos');
    return oldStoredTodos.split(',').map(el => new Todo({
      text: el,
      root: list,
      removeInstance,
    }));
  }
  const storedTodos = localStorage.getItem('todosJSON');
  if (storedTodos !== null && storedTodos !== 'undefined') {
    return JSON.parse(storedTodos).map(el => new Todo({
      id: el.id,
      text: el.text,
      done: el.done,
      root: list,
      removeInstance,
    }));
  }
  return [];
}

const todos = getTodos();

function addTodo(event) {
  if (event.key === 'Enter' && input.value !== '') {
    const todo = new Todo({
      text: input.value,
      root: list,
      removeInstance,
    });
    todos.push(todo);
    input.value = '';
    localStorage.setItem('todosJSON', JSON.stringify(todos));
  }
}

input.addEventListener('keypress', addTodo);
