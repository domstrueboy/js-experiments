class Cell extends HTMLElement {
  constructor() {
    super();
    this._name = 'Stranger';
  }
  connectedCallback() {
    this.addEventListener('click', e => console.log(`Hello, ${this._name}!`));
    this.innerHTML = `
      <style>
        div {
          color: tomato;
        }
      </style>
      <div>Hello</div>
    `;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'name') {
      if (newValue) {
        this._name = newValue;
      } else {
        this._name = 'Stranger';
      }
    }
  }
}

Cell.observedAttributes = ['name'];

export default Cell;
