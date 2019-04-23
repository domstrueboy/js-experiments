import { Rx } from 'rxjs';

Rx.Observable.from('abservable')
  .map(letter => letter.toUpperCase())
  .filter(letter => letter === 'O')
  .subscribe(letter => console.log(letter));
