
// TODO: Replace this log with DI
// TODO: Reducer and store from DI
// TODO: Split this off of index
import {DispatcherLog} from '../../logging';
import {ActionTypes} from '../action';
import {Reducer} from '../reducer/index';
import {IStore} from '../store/index';
import {inject, injectable} from 'inversify';
import {IOC_TYPES} from '../../ioc-container';

export interface IDispatcher {
  dispatch(action: ActionTypes): void;
}

@injectable()
export class Dispatcher implements IDispatcher {

  private readonly reducer: Reducer;
  private inDispatch: boolean;
  private store: IStore;

  constructor(
    @inject(IOC_TYPES.REDUCER) reducer: Reducer,
    @inject(IOC_TYPES.STORE) store: IStore) {
      this.reducer = reducer;
      this.store = store;
  }

  public dispatch(action: ActionTypes) {
    if (this.inDispatch) {
      const message = 'Cannot dispatch while in a dispatch!';
      DispatcherLog.error(message);
      throw new Error(message);
    }

    try {
      this.inDispatch = true;
      const newState = this.reducer(this.store.state, action);
      this.store.updateState(newState);
    }
    finally {
      this.inDispatch = false;
    }
  }
}
