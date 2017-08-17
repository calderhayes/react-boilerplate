
import * as React from 'react';
import {BaseRoute} from 'view/routes/base-route';

export interface IContactProps {

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
