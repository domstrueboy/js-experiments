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
  },
  methods: {
    handleClick(card) {
      cards.forEach((el) => { el.opened = false; });
      card.opened = true;
      if (card && this.previousCard && card.value === this.previousCard.value) {
        card.finished = true;
        this.previousCard.finished = true;
      }
      this.previousCard = card;
    },
  },
});

function shuffle(incomingArray) {
  const array = incomingArray.slice();
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
