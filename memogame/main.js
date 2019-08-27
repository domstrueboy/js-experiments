/* eslint-disable linebreak-style */
const set = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const doubledSet = [...set, ...set];
const shuffledSet = shuffle(doubledSet);
const cards = shuffledSet.map(letter => ({
  value: letter,
  opened: false,
  finished: false,
}));

const app = new window.Vue({
  el: '#app',
  data: {
    cards,
    previousCard: null,
    previousRecord: localStorage.getItem('record') || 1000,
    counter: 0,
  },
  methods: {
    handleClick(card) {
      this.cards.forEach((el) => { el.opened = false; });
      card.opened = true;
      if (card && this.previousCard && card.value === this.previousCard.value) {
        card.finished = true;
        this.previousCard.finished = true;
      }
      this.previousCard = card;
      this.counter++;
      this.isWin();
    },
    isWin() {
      if (this.cards.every(card => card.finished)) {
        if (this.counter < this.previousRecord) {
          localStorage.setItem('record', this.counter);
        }
        alert('WIN!');
        location.reload();
      }
    },
  },
});
