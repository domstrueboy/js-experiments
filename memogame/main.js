const set = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const doubledSet = [...set, ...set];
const shuffledSet = shuffle(doubledSet);
const shuffledCards = shuffledSet.map((letter, index) => {
    return {
        id: index,
        value: letter,
        opened: false,
        finished: false
    }
});

const app = new Vue({
    el: '#app',
    data: {
        shuffledCards: shuffledCards
    },
    computed: {
        cards: () => shuffledCards.filter(card => !card.finished)
    }
})

function shuffle (incomingArray) {
    const array = incomingArray.slice();
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};