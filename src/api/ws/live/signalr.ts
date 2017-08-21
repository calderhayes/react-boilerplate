import {ILogger} from 'articulog';
import * as urljoin from 'url-join';

import 'hubs';

// So far this is the only dependency on jquery, and it is hopefully
// not going to be around for much longer
declare const $: any;

export class SignalR {

  public static startConnection(
    logger: ILogger,
    apiUrl: string,
    initialAccessToken?: string): Promise<void> {

    return new Promise((resolve, reject) => {
      if (!$) {
        const msg = 'jQuery not detected!';
        logger.error(msg);
        reject(msg);
      }

      SignalR.updateAccessToken(initialAccessToken);

      logger.debug('SignalR connecting...');
      $.connection.hub.url = urljoin(apiUrl, 'signalr');
      $.connection.hub.logging = true;
      $.connection.hub.log = logger.info;

      $.connection.hub.start({ transport: 'longPolling' }).done(() => {
        logger.info('SignalR Connected!');
        resolve();
      })
      .fail((error: any) => {
        logger.error(error);
        reject(error);
      });
    });
  }

  public static stopConnection(): Promise<void> {
    return new Promise((resolve, _) => {
      $.connection.hub.stop();
      resolve();
    });
    // $.connection.hub.stop();
    // return Promise.resolve();
  }

  public static updateAccessToken(accessToken: string) {
    $.connection.hub.qs = { authorization: accessToken };
  }

}
