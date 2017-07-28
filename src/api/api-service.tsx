
import {
  IAPIService,
  APIServiceType,
  APIError,
  APIErrorType,
  HTTPStatusCode
} from './service';
import {ILogger, NullLogger} from '../logging';
import * as Model from './models';
import * as urljoin from 'url-join';
import {stringify} from 'qs';

export class APIService implements IAPIService {

  private logger: ILogger;
  private apiUrl: string;
  private authUrl: string;

  constructor(
    logger: ILogger,
    apiUrl: string,
    authUrl: string) {
    this.logger = logger || NullLogger;
    this.apiUrl = apiUrl;
    this.authUrl = authUrl;
  }

  public get type() {
    return APIServiceType.DevAPIService;
  }

  public async login(username: string, password: string)
    : Promise<Model.IOAuth2TokenResult> {

    const url = urljoin(this.authUrl, 'connect', 'token');
    const r = await window.fetch(url, {
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
      const result: Model.IOAuth2TokenResult = {
        accessToken: content.access_token,
        refreshToken: ''// ,
        // expiresIn: content.expires_in
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