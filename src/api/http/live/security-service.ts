import * as Model from 'api/models';
import {ISecurityService} from 'api/interface';
import {FetchMethod} from 'api/http/live/interface';
import {BaseHTTPService} from 'api/http/live/base-http-service';
import {ILogger} from 'articulog';

export class SecurityService extends BaseHTTPService implements ISecurityService {

  constructor(logger: ILogger,
    apiUrl?: string,
    fetchMethod?: FetchMethod) {
      super(logger, apiUrl, fetchMethod);
  }

  public async getFeatures(): Promise<Array<Model.IFeature>> {
    return await Promise.resolve(new Array<Model.IFeature>());
  }
}
