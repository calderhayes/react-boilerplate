
// Provided by webpack
declare const ENVIRONMENT: string;

export interface IConfig {
  ENVIRONMENT: string;
  API_URL: string;
}

export class ConfigurationConstants {

  static LOCAL: string = 'LOCAL'; // self contained
  static LOCAL_DEV: string = 'LOCAL_DEV';

}

let config: IConfig = null;

if (ENVIRONMENT === ConfigurationConstants.LOCAL) {
  config = {
    ENVIRONMENT: ENVIRONMENT,
    API_URL: ''
  };
}
else {
  // should not happen
}

export const Config = config;
