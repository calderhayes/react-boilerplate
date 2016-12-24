
import {
  IAPIService,
  APIServiceType,
  IAPIResult,
  APIResultStatus
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

  public login(username: string, password: string)
    : Promise<IAPIResult<Model.IOauth2TokenResult>> {

    return new Promise<boolean>((resolve) => {

      const match = find(InMemoryDatabase.users, (u) => {
        return u.username === username && u.password === password;
      });

      const tempTimeout = 2000;
      setTimeout(() => resolve(!!match), tempTimeout);
      //resolve(!!match);

    })
    .then((match: boolean) => {
      if (!match) {
        return {
          status: APIResultStatus.ERROR,
          value: null,
          error: 'invalid_grant'
        };
      }

      const result: Model.IOauth2TokenResult = {
        accessToken: 'faketoken' + (new Date()).getTime().toString(),
        refreshToken: 'fakerefresh' + (new Date()).getTime().toString()
      };

      return {
        status: APIResultStatus.SUCCESS,
        value: result
      };
    });
  }

  public getFeatures(): Promise<IAPIResult<Array<Model.IFeature>>> {
    return Promise.resolve({
      status: APIResultStatus.SUCCESS,
      value: new Array<Model.IFeature>()
    });
  }

}
