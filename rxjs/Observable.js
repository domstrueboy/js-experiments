class Observable {
  constructor(source) {
    this.source = source.split('');
    this.result = this.source;
  }

  subscribe(next) {
    for (let item of this.result) {
      next(item);
    }
  }

  filter(predicate) {
    this.result = this.result.filter(predicate);
    return this;
  }

  map(callback) {
    this.result = this.result.map(callback);
    return this;
  }
}