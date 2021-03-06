
import {IStore} from 'flux/store';
import {IOC_TYPE} from 'ioc/ioc-type';
import {IEventEmitter, EventTypeKey} from 'flux/event';
import {IActionLogic} from 'flux/logic';
import {lazyInject} from 'ioc';
import {IziToast} from 'util/alert';
import {BaseComponent} from 'view/components/base-component';
import { IAppState } from 'data';

// Handles the dependency injection
export class BaseContainer<P, S> extends BaseComponent<P, S> {

  @lazyInject(IOC_TYPE.STORE)
  protected readonly store: IStore;

  @lazyInject(IOC_TYPE.ACTION_LOGIC)
  protected readonly actionLogic: IActionLogic;

  @lazyInject(IOC_TYPE.EVENT_EMITTER)
  protected readonly eventEmitter: IEventEmitter;

  @lazyInject(IOC_TYPE.TOASTR)
  protected readonly alert: IziToast;

  public componentWillMount() {
    this.logger.debug('Mounting container');
    this.eventEmitter.on(EventTypeKey.APP_STATE_UPDATED, this._appStateUpdated);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.APP_STATE_UPDATED, this._appStateUpdated);
  }

  protected appStateUpdated(_: IAppState, _2: S) {
    // Do nothing
  }

  protected updateLocalState(_: IAppState, localState: S): S {
    return localState || {} as any;
  }

  protected postAppStateUpdated(_: IAppState, _original: S, _new: S) {
    // Do nothing
  }

  private _appStateUpdated = () => {
    this.logger.debug('APP STATE UPDATED');
    const originalState = this.state;
    this.appStateUpdated(this.store.state, originalState);
    const newState = this.updateLocalState(this.store.state, this.state);
    this.setState(newState);
    this.postAppStateUpdated(this.store.state, originalState, newState);
  }
}
