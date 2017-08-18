
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';

export interface IErrorProps extends IBaseRouteProps {

}

export interface IErrorState {

}

export class Error extends BaseRoute<IErrorProps, IErrorState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          OOPS, an unknown error occurred :(
        </div>
      </div>
    );

  }

}
