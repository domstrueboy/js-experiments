import Todo from './modules/Todo.js';

const input = document.querySelector('.to-do-input');
const list = document.querySelector('.to-do-list');

function getTodos() {
  const oldStoredTodos = localStorage.getItem('todos');
  if (oldStoredTodos !== null) {
    localStorage.removeItem('todos');
    return oldStoredTodos.split(',').map(el => new Todo({
      text: el,
      root: list,
      todos: el.todos,
    }));
  }
  const storedTodos = localStorage.getItem('todosJSON');
  if (storedTodos !== null) {
    return JSON.parse(storedTodos).map(el => new Todo({
      id: el.id,
      text: el.text,
      done: el.done,
      root: list,
      todos: el.todos,
    }));
  }
  return [];
}

const todos = getTodos();

function addTodo(event) {
  if (event.key === 'Enter' && input.value !== '') {
    todos.push(new Todo({
      text: input.value,
      root: list,
      todos,
    }));
    input.value = '';
    localStorage.setItem('todosJSON', JSON.stringify(todos));
  }
}

input.addEventListener('keypress', addTodo);
