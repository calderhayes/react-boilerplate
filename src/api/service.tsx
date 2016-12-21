
import {Config, ConfigurationConstants} from '../config';
import {LocalAPIService} from './local-api-service';

export interface IAPIService {

  login(username: string, password: string): Promise<string>;

}

let apiService: IAPIService = null;

if (Config.ENVIRONMENT === ConfigurationConstants.LOCAL) {
  apiService = new LocalAPIService();
}


export const APIService = apiService;
