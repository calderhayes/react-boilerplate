
import * as _ from 'lodash';

export interface IDispatcher {

    dispatch(actionType: string, payload: any): void;
    register(method: (actionType: string, payload: any) => void): void;

}

export class Dispatcher implements IDispatcher {

    private registeredMethods: ((actionType: string, payload: any) => void)[];
    private inDispatch: boolean;

    constructor() {
        this.registeredMethods = [];
        this.inDispatch = false;
    }

    public dispatch(actionType: string, payload: any) {
        if (this.inDispatch) {
            // WARN, ASSERT, WHATEVER
        }


        this.inDispatch = true;
        _.each(this.registeredMethods, r => r(actionType, payload));
        this.inDispatch = false;
    }

    public register(method: (actionType: string, payload: any) => void) {
        this.registeredMethods.push(method);
    }
}
