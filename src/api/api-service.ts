
import {
  IAPIService,
  APIServiceType,
  APIError,
  APIErrorType,
  HTTPStatusCode
} from 'api/service';
import * as Model from 'api/models';

import * as urljoin from 'url-join';
import {stringify} from 'qs';
import {ILogger} from 'articulog';

export class APIService implements IAPIService {

  private logger: ILogger;
  private apiUrl: string;
  private authUrl: string;

  constructor(
    logger: ILogger,
    apiUrl: string,
    authUrl: string) {
    this.logger = logger;
    this.apiUrl = apiUrl;
    this.authUrl = authUrl;
  }

  public get type() {
    return APIServiceType.Live;
  }

  public async login(username: string, password: string)
    : Promise<Model.IOAuth2Token> {

    const url = urljoin(this.authUrl, 'connect', 'token');
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: stringify({
        grant_type: 'password',
        username,
        password,
        client_id: 'oauth2client',
        client_secret: 'notasecret',
        scope: 'customAPI.write'
      })
    });
    if (r.status === HTTPStatusCode.OK) {
      const content: any = await r.json();
      const result: Model.IOAuth2Token = {
        accessToken: content.access_token,
        refreshToken: '',
        rawData: content
      };
      return result;
    }
    else if (r.status === HTTPStatusCode.BAD_REQUEST) {
      // Special translation to UNAUTHENTICATED
      const content = await r.json();
      if (content.error === 'invalid_grant'
        && content.error_description === 'invalid_username_or_password') {
        throw new APIError(APIErrorType.UNAUTHENTICATED);
      }
    }
    else {
      throw APIError.handleResponseError(r);
    }
  }

  public async getFeatures(): Promise<Array<Model.IFeature>> {
    return await Promise.resolve(new Array<Model.IFeature>());
  }

}
