import * as Model from 'api/models';
import {ISecurityService} from 'api/interface';

export class MockSecurityService implements ISecurityService {
  public async getFeatures(): Promise<Array<Model.IFeature>> {
    return await Promise.resolve(new Array<Model.IFeature>());
  }
}
