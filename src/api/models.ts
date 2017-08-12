
export interface IFeature {
  featureType: string;
  isActivated: boolean;
}

export interface IOAuth2Token {
  accessToken: string;
  refreshToken: string;
  rawData: any;
}
