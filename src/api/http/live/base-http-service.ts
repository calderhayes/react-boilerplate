
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

export class BaseHTTPService {

  private logger: ILogger;
  private apiUrl: string;
  private authUrl: string;
  private authToken: Model.IOAuth2Token;

  constructor(
    logger: ILogger,
    apiUrl: string,
    authUrl: string) {
    this.logger = logger;
    this.apiUrl = apiUrl;
    this.authUrl = authUrl;
  }

  public async updateAuthToken(authToken: Model.IOAuth2Token) {
    this.logger.info('Auth token updated!');
    this.authToken = authToken;
  }

}
