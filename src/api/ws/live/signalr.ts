/*import {config, EnvironmentType} from 'config';
import {ILogger} from 'articulog';
// So far this is the only dependency on jquery, and it is hopefully
// not going to be around for much longer
declare const $: any;

export class SignalRFactory {

  public static Create(signalRLogger: ILogger) {
      if (Config.ENVIRONMENT === EnvironmentType.LOCAL) {
     throw 'Not yet implemented';
    }
    else if (Config.ENVIRONMENT === EnvironmentType.LOCAL_DEV) {

    }
    else {
      throw 'Not yet implemented';
    }
  }
}

class SignalR {

  private logger: ILogger = null;

  constructor(
    signalRLogger: ILogger) {

    this.logger = signalRLogger;
  }

  public startConnection(initialAccessToken: string) {

    return new Promise((resolve, reject) => {
      if (!$) {
        let msg = 'jQuery not detected!';
        this.logger.error(msg);
        reject(msg);
      }

      this.logger.debug('SignalR connecting...');
      $.connection.hub.url = `${Config.API_URL}/signalr`;
      $.connection.hub.logging = true;
      $.connection.hub.log = this.logger.info.bind(this.logger);

      this.updateAccessToken(initialAccessToken);

      $.connection.hub.start().done(() => {
        this.logger.info('SignalR Connected!');
        resolve(this);
      })
      .fail((error: any) => {
        this.logger.error(error);
        reject(error);
      });
    });
  }

  stopConnection() {
    $.connection.hub.stop();
  }

  public updateAccessToken(accessToken: string) {
    this.logger.info('Updating the access token for SignalR');
    $.connection.hub.qs = {
      access_token: accessToken
    };
  }

}
*/
