import {reducer} from '../../src/flux/reducer';
import {Store} from '../../src/flux/store';
import {ActionControl} from '../../src/flux/actions';
import * as chai from 'chai';

describe('The main reducer method', () => {

  it('should handle the example reduction scenario correctly', () => {

    const dummy = 354;
    const state = Store.defaultAppState;
    const actionType = ActionControl.CONSTANTS.EXAMPLE;
    const payload: any = {
      value: dummy + state.exampleValue
    };

    const result = reducer(state, actionType, payload);

    chai.assert.isNotNull(result, 'The result cannot be null');

    chai.assert.isArray(result.eventData, 'Event data must be an array');
    chai.assert.lengthOf(result.eventData, 1, 'The example action should produce a single event');
    chai.assert.equal(result.eventData[0].type, actionType, 'The event must have the proper type');
    chai.assert.equal(result.eventData[0].parameters.value, state.exampleValue);

    chai.assert.equal(result.state.exampleValue, payload.value, 'The sate must have a new example value');
  });

});
