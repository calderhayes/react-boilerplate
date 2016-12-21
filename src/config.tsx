
// Provided by webpack
declare const ENVIRONMENT: string;

export enum EnvironmentType {
  LOCAL,
  LOCAL_DEV
}

export interface IConfig {
  ENVIRONMENT: EnvironmentType;
  API_URL: string;
}

class ConfigurationConstants {

  static LOCAL: string = 'LOCAL'; // self contained
  static LOCAL_DEV: string = 'LOCAL_DEV';

}

let config: IConfig = null;

if (ENVIRONMENT === ConfigurationConstants.LOCAL) {
  config = {
    ENVIRONMENT: EnvironmentType.LOCAL,
    API_URL: ''
  };
}
else {
  throw 'Not implemented';
}

export const Config = config;
