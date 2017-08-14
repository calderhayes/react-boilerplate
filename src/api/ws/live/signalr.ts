import {ILogger} from 'articulog';
import * as urljoin from 'url-join';
// So far this is the only dependency on jquery, and it is hopefully
// not going to be around for much longer
declare const $: any;

export class SignalR {

  public static startConnection(
    logger: ILogger,
    apiUrl: string,
    initialAccessToken?: string) {

    return new Promise((resolve, reject) => {
      if (!$) {
        const msg = 'jQuery not detected!';
        logger.error(msg);
        reject(msg);
      }

      logger.debug('SignalR connecting...');
      $.connection.hub.url = urljoin(apiUrl, 'signalr');
      $.connection.hub.logging = true;
      $.connection.hub.log = logger.info;

      SignalR.updateAccessToken(initialAccessToken);

      $.connection.hub.start().done(() => {
        logger.info('SignalR Connected!');
        resolve(this);
      })
      .fail((error: any) => {
        logger.error(error);
        reject(error);
      });
    });
  }

  public static stopConnection() {
    $.connection.hub.stop();
  }

  public static updateAccessToken(accessToken: string) {
    $.connection.hub.qs = {
      access_token: accessToken
    };
  }

}
