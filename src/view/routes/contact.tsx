
import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';

export interface IContactProps {

}

export interface IContactState {

}

export class Contact extends BaseContainer<IContactProps, IContactState> {

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
