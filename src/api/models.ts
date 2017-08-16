
export interface IFeature {
  featureType: string;
  isActivated: boolean;
}

export interface IOAuth2Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiryDate: Date;
  rawData: any;
}
