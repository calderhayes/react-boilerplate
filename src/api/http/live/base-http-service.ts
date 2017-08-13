
import * as Model from 'api/models';
import {APIError} from 'api/api-error';

import * as urljoin from 'url-join';
import {stringify} from 'qs';
import {ILogger} from 'articulog';

import {HTTPStatusCode, FetchMethod} from 'api/http/live/interface';

export class BaseHTTPService {

  private logger: ILogger;
  private apiUrl: string;
  private authToken?: Model.IOAuth2Token;

  private fetch: FetchMethod;

  constructor(
    logger: ILogger,
    apiUrl?: string,
    fetchMethod?: FetchMethod) {
    this.logger = logger;
    this.apiUrl = apiUrl || '';
    this.fetch = fetchMethod || fetch;
  }

  public clearAuthToken() {
    this.logger.info('Auth token data cleared')
    this.authToken = null;
  }

  public updateAuthToken(authToken: Model.IOAuth2Token) {
    this.logger.info('Auth token updated!');
    this.authToken = authToken;
  }

  public get defaultRequestInit() {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };

    return requestInit;
  }

  public async get(endpoint: string, init?: RequestInit) {
    const opts = init || this.defaultRequestInit;

    if (this.authToken) {
      opts.headers.Authorization = 'Bearer ' + this.authToken.accessToken;
    }

    const url = urljoin(this.apiUrl, endpoint);
    const response = await this.fetch(url, init);

    if (response.status >= HTTPStatusCode.OK
      && response.status < HTTPStatusCode.MULTIPLE_CHOICES) {
      return response;
    }

    // Failure case
    this.logger.error('HTTP API Error: ', response);
    switch (response.status) {
      case HTTPStatusCode.UNAUTHORIZED:
      case HTTPStatusCode.NOT_FOUND:
      case HTTPStatusCode.FORBIDDEN:
      case HTTPStatusCode.BAD_REQUEST:
      case HTTPStatusCode.UNPROCESSABLE_ENTITY:
        throw APIError.unknownError();
      default:
        throw APIError.unknownError();
    }
  }

  public async post(endpoint: string, data: any) {
    const init = this.defaultRequestInit;
    init.method = 'POST';
    init.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    init.body = stringify(data);

    return this.get(endpoint, init);
  }
}
