import * as Model from 'api/models';

export interface ILoginService {
  login(username: string, password: string): Promise<Model.IOAuth2TokenResult>;
}
