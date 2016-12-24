
import {Promise} from 'ts-promise';
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

    const match = find(InMemoryDatabase.users, (u) => {
      return u.username === username && u.password === password;
    });

    if (!match) {
      return Promise.resolve({
        status: APIResultStatus.ERROR,
        value: null,
        error: 'invalid_grant'
      });
    }

    const result: Model.IOauth2TokenResult = {
      accessToken: 'fakeaccess' + (new Date()).getTime().toString(),
      refreshToken: 'fakerefresh' + (new Date()).getTime().toString()
    };

    return Promise.resolve({
      status: APIResultStatus.SUCCESS,
      value: result
    });
  }

  public getFeatures(): Promise<IAPIResult<Array<Model.IFeature>>> {
    return Promise.resolve({
      status: APIResultStatus.SUCCESS,
      value: new Array<Model.IFeature>()
    });
  }

}
