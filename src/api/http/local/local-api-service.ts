
import {
  IAPIService,
  APIServiceType,
  APIErrorType,
  APIError
} from 'api/service';
import * as Model from 'api/models';
import {find} from 'lodash';
import {InMemoryDatabase} from 'api/in-memory-database';

import {ILogger} from 'articulog';

export class LocalAPIService implements IAPIService {

  private logger: ILogger;

  constructor(logger?: ILogger) {
    this.logger = logger;
  }

  public get type() {
    return APIServiceType.Mock;
  }

  public async login(username: string, password: string)
    : Promise<Model.IOAuth2Token> {

    return await new Promise<Model.IOAuth2Token>((resolve, reject) => {

      const match = find(InMemoryDatabase.users, (u) => {
        return u.username === username && u.password === password;
      });

      const tempTimeout = 2000;
      setTimeout(() => {
        if (match) {
          const result: Model.IOAuth2Token = {
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
