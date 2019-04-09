export default class Todo {
  constructor({
    id = Date.now(),
    text = '',
    done = false,
    root = document.querySelector('.to-do-list'),
    todos,
  } = {}) {
    this.id = id;
    this.text = text;
    this.done = done;
    this.root = root;
    this.todos = todos;
    this.addElement();
  }

  addElement() {
    this.element = document.createElement('li');
    this.element.className = 'to-do-item';
    this.element.innerHTML = `
      <span class="to-do-text">${this.text}</span>
      <button class="to-do-done">✔️</button>
      <button class="to-do-delete">❌</button>
    `;

    this.addListeners();
    this.root.appendChild(this.element);
  }

  addListeners() {
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('to-do-delete')) {
        this.removeElement();
      }
      if (e.target.classList.contains('to-do-done')) {
        this.toggleDone();
      }
    });
  }

  toggleDone() {
    this.element.done = !this.element.done;
    this.element.classList.toggle('done');
    localStorage.setItem('todosJSON', JSON.stringify(this.todos));
  }

  removeElement() {
    this.element.remove();
    localStorage.setItem('todosJSON', JSON.stringify(this.todos));
  }
}
