import PubSub from '../lib/pubsub';

export default class Store {
  constructor(params) {
    const self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = 'resting';

    self.events = new PubSub();

    if (Object.prototype.hasOwnProperty.call(params, 'actions')) {
      self.actions = params.actions;
    }

    if (Object.prototype.hasOwnProperty.call(params, 'mutations')) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy((params.state || {}), {
      set(state, key, value) {
        const localstate = state;
        localstate[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish('stateChange', self.state);

        if (self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'resting';

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    const self = this;

    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = 'action';

    self.actions[actionKey](self, payload);

    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    const self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      console.error(`Mutation "${mutationKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`MUTATION: ${mutationKey}`);

    self.status = 'mutation';

    const newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);

    console.groupEnd();

    return true;
  }
}
