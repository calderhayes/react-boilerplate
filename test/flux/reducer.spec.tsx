import {reducer} from '../../src/flux/reducer';
import {Store, defaultState} from '../../src/flux/store';
import {makeExampleAction} from '../../src/flux/action';
import * as chai from 'chai';

describe('The main reducer method', () => {

  it('should handle the example reduction scenario correctly', () => {

    const dummy = 354;
    const action = makeExampleAction(dummy);
    const store = new Store(defaultState);

    const result = reducer(store.state, action);

    chai.assert.isNotNull(result, 'The result cannot be null');
    chai.assert.equal(result.exampleValue, action.value, 'The sate must have a new example value');
  });

});
