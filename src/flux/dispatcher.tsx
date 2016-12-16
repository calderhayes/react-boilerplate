
import * as _ from 'lodash';

export class Dispatcher {

    private registeredMethods: ((actionType: string, payload: any) => void)[];

    constructor() {
        this.registeredMethods = [];
    }

    dispatch(actionType: string, payload: any) {
        _.each(this.registeredMethods, r => r(actionType, payload));
    }

    register(method: (actionType: string, payload: any) => void) {
        this.registeredMethods.push(method);
    }
}

const AppDispatcher = new Dispatcher();

export {AppDispatcher}
