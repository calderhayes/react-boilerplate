
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';

export interface IContactProps extends IBaseRouteProps {

}

export interface IContactState {

}

export class Contact extends BaseRoute<IContactProps, IContactState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          Contact
        </div>
      </div>
    );

  }

}
