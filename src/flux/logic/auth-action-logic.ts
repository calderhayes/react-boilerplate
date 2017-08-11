import {IDispatcher} from '../dispatcher';
import {IAPIService, APIErrorType, APIError} from '../../api';
import {IEventEmitter, EventTypeKey} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeLoginAction, makeLogoutAction} from '../action';
import {ILoggerFactory} from 'articulog';
import {IConfig} from '../../config';

export interface IAuthActionLogic {
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

export class AuthActionLogic extends BaseActionLogic implements IAuthActionLogic {

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore,
    loggerFactory: ILoggerFactory,
    config: IConfig) {
      super(dispatcher, api, eventEmitter, store, loggerFactory, config);

  }

  public async login(username: string, password: string): Promise<void> {
    this.logger.info('Logging in ', username);

    try {
      const result = await this.api.login(username, password);
      const action = makeLoginAction(result);
      this.dispatcher.dispatch(action);

      // Need to allocate error from the API to translation keys
      // the login page will append this to login_page.error. for the
      // proper translation key
      this.eventEmitter.emit({
        type: EventTypeKey.LOGIN,
        result: {
          success: true
        }
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

    this.eventEmitter.emit({
      type: EventTypeKey.LOGIN,
      result: {
        success: false,
        error: 'invalid_credentials'
      }
    });

    return await Promise.resolve();
  }

}
