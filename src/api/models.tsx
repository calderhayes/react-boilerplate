
export interface IFeature {
  featureType: string;
  isActivated: boolean;
}

export interface IOauth2TokenResult {
  accessToken: string;
  refreshToken: string;
  // expiry?
}
