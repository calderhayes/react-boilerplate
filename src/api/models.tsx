
export interface IFeature {
  featureType: string;
  isActivated: boolean;
}

export interface IOAuth2TokenResult {
  accessToken: string;
  refreshToken: string;
  // expiry?
}
