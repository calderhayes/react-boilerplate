import {IDispatcher} from 'flux/dispatcher';
import {IAPIService, APIErrorType, APIError} from 'api';
import {IEventEmitter, EventTypeKey} from 'flux/event';
import {IStore} from 'flux/store';
import {BaseActionLogic} from 'flux/logic/base-action-logic';
import {makeLoginAction, makeLogoutAction} from 'flux/action';
import {ILoggerFactory} from 'articulog';
import {IConfig} from 'interface';

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
      const result = await this.api.LoginService.login(username, password);
      await this.api.startWebSocketConnection(result.accessToken);
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
          this.eventEmitter.emit({
            type: EventTypeKey.LOGIN,
            result: {
              success: false,
              error: 'invalid_credentials'
            }
          });
          return;
        }
      }
      this.unknownErrorHandler(error);
    }
  }

  public async logout() {
    try {
      await this.api.stopWebSocketConnection();
    }
    catch (error) {
      this.logger.warn('Something happened when attempting to stop the web socket connection', error);
    }

    const action = makeLogoutAction();
    this.dispatcher.dispatch(action);

    this.eventEmitter.emit({
      type: EventTypeKey.LOGOUT
    });

    return await Promise.resolve();
  }

}
