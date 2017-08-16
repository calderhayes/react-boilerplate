import * as Model from 'api/models';
import {ILoginService} from 'api/interface';
import {FetchMethod} from 'api/http/live/interface';
import {BaseHTTPService} from 'api/http/live/base-http-service';
import {ILogger} from 'articulog';
import {HTTPStatusCode} from 'api/http/live/interface';
import {APIError, APIErrorType} from 'api/api-error';
import * as moment from 'moment';

export class LoginService extends BaseHTTPService implements ILoginService {

  constructor(
    logger: ILogger,
    apiUrl?: string,
    fetchMethod?: FetchMethod) {
      super(logger, apiUrl, fetchMethod);
  }

  public async login(username: string, password: string)
    : Promise<Model.IOAuth2Token> {

    const endpoint = 'connect/token';
    const response = await this.post(endpoint, {
      grant_type: 'password',
      username,
      password,
      client_id: 'oauth2client',
      client_secret: 'notasecret',
      scope: 'customAPI.write offline_access'
    });

    if (response.status === HTTPStatusCode.OK) {
      const content: any = await response.json();
      const result: Model.IOAuth2Token = {
        accessToken: content.access_token,
        refreshToken: content.refresh_token,
        expiresIn: content.expires_in,
        expiryDate: moment().add(content.expires_in, 'seconds').toDate(),
        rawData: content
      };
      return result;
    }
    else if (response.status === HTTPStatusCode.BAD_REQUEST) {
      // Special translation to UNAUTHENTICATED
      const content = await response.json();
      if (content.error === 'invalid_grant'
        && content.error_description === 'invalid_username_or_password') {
        throw new APIError(APIErrorType.UNAUTHENTICATED);
      }
    }
    else {
      throw this.handleResponseIfError(response);
    }
  }
}
