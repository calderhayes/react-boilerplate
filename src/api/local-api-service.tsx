
import {
  IAPIService,
  APIServiceType,
  APIErrorType,
  APIError
} from './service';
import {ILogger, NullLogger} from '../logging';
import * as Model from './models';
import {find} from 'lodash';
import {InMemoryDatabase} from './in-memory-database';

export class LocalAPIService implements IAPIService {

  private logger: ILogger;

  constructor(logger?: ILogger) {
    this.logger = logger || NullLogger;
  }

  public get type() {
    return APIServiceType.LocalAPIService;
  }

  public async login(username: string, password: string)
    : Promise<Model.IOAuth2TokenResult> {

    return await new Promise<Model.IOAuth2TokenResult>((resolve, reject) => {

      const match = find(InMemoryDatabase.users, (u) => {
        return u.username === username && u.password === password;
      });

      const tempTimeout = 2000;
      setTimeout(() => {
        if (match) {
          const result: Model.IOAuth2TokenResult = {
            accessToken: 'faketoken' + (new Date()).getTime().toString(),
            refreshToken: 'fakerefresh' + (new Date()).getTime().toString()
          };

          resolve(result);
        }
        else {
          const error = new APIError(APIErrorType.UNAUTHENTICATED);
          reject(error);
        }
      }, tempTimeout);
    });
  }

  public async getFeatures(): Promise<Array<Model.IFeature>> {
    return await Promise.resolve(new Array<Model.IFeature>());
  }

}
