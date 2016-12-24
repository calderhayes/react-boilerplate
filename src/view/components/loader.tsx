
import * as React from 'react';

export interface ILoaderProps {
  loaded: boolean;
}

// tslint:disable-next-line:no-var-requires no-require-imports
export const Loader: React.ComponentClass<ILoaderProps> = require('react-loader') as any;
