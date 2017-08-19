import {IDispatcher} from 'flux/dispatcher';
import {IAPIService, APIErrorType, APIError, Models} from 'api';
import {IEventEmitter, EventTypeKey} from 'flux/event';
import {IStore} from 'flux/store';
import {BaseActionLogic} from 'flux/logic/base-action-logic';
import {makeLoginAction, makeLogoutAction, makeRefreshTokenAction} from 'flux/action';
import {ILoggerFactory} from 'articulog';
import {IConfig} from 'interface';
import {IPersistedDataItem} from 'data';

export interface IAuthActionLogic {
  login(username: string, password: string): Promise<void>;
  refresh(): Promise<void>;
  logout(): Promise<void>;
}

export class AuthActionLogic extends BaseActionLogic implements IAuthActionLogic {

  private readonly authDataItem: IPersistedDataItem<Models.IOAuth2Token>;

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore,
    loggerFactory: ILoggerFactory,
    config: IConfig,
    authDataItem: IPersistedDataItem<Models.IOAuth2Token>) {
      super(dispatcher, api, eventEmitter, store, loggerFactory, config);
      this.authDataItem = authDataItem;
  }

  public async login(username: string, password: string): Promise<void> {
    this.logger.info('Logging in ', username);

    try {
      const result = await this.api.LoginService.login(username, password);
      await this.api.startWebSocketConnection(result.accessToken);
      const action = makeLoginAction(result);
      this.dispatcher.dispatch(action);
      this.authDataItem.setItem(result);
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
      this.authDataItem.clearItem();
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

    this.emitStateChange();
  }

  public async refresh(): Promise<void> {
    this.logger.info('Refreshing');

    try {
      const result = await this.api.LoginService.refreshToken(this.store.state.authInfo);
      const action = makeRefreshTokenAction(result);
      this.dispatcher.dispatch(action);
      this.authDataItem.setItem(result);
    }
    catch (error) {
      this.logger.info('Refresh failed', error);
      this.logout();
    }

    this.emitStateChange();
  }

  public async logout() {
    this.authDataItem.clearItem();
    try {
      await this.api.stopWebSocketConnection();
    }
    catch (error) {
      this.logger.warn('Something happened when attempting to stop the web socket connection', error);
    }

    const action = makeLogoutAction();
    this.dispatcher.dispatch(action);

    this.emitStateChange();
    return await Promise.resolve();
  }

}
