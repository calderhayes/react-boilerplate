
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';

export interface IAboutProps extends IBaseRouteProps {

}

export interface IAboutState {

}

export class About extends BaseRoute<IAboutProps, IAboutState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          This is an about page
        </div>
      </div>
    );

  }

}
