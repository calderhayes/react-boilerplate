import {IOC_TYPES} from '../../ioc-container';
import {IDispatcher} from '../dispatcher';
import {IAPIService, APIErrorType, APIError} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeLoginAction, makeLogoutAction} from './action-type';

import {inject, injectable} from 'inversify';

export interface IAuthActionLogic {
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

@injectable()
export class AuthActionLogic extends BaseActionLogic implements IAuthActionLogic {

  constructor(
    @inject(IOC_TYPES.DISPATCHER) dispatcher: IDispatcher,
    @inject(IOC_TYPES.API_SERVICE) api: IAPIService,
    @inject(IOC_TYPES.EVENT_EMITTER) eventEmitter: IEventEmitter,
    @inject(IOC_TYPES.STORE) store: IStore) {
      super(dispatcher, api, eventEmitter, store);

  }

  public async login(username: string, password: string): Promise<void> {
    this.log.info('Logging in ', username);

    try {
      const result = await this.api.login(username, password);
      const action = makeLoginAction(result);
      this.dispatcher.dispatch(action);

      // Need to allocate error from the API to translation keys
      // the login page will append this to login_page.error. for the
      // proper translation key

      this.eventEmitter.emit('temp!', {
        success: true
      });
    }
    catch (error) {
      if (error.isAPIError) {
        const e: APIError = error;

        if (e.apiErrorType === APIErrorType.UNAUTHENTICATED) {
          this.logout();
          return;
        }
      }
      this.unknownErrorHandler(error);
    }
  }

  public async logout() {
    const action = makeLogoutAction();
    this.dispatcher.dispatch(action);
    this.eventEmitter.emit('TEMP!', {
      success: false,
      error: 'invalid_credentials'
    });

    return await Promise.resolve();
  }

}
