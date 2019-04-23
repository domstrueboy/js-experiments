const Observable = require('./Observable');

new Observable('Observable')
  .map(letter => letter.toUpperCase())
  .filter(letter => letter === 'O')
  .subscribe(letter => console.log(letter));
