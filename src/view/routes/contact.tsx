
import * as React from 'react';
import {BaseComponent} from '../base-component';

export interface IContactProps {

}

export interface IContactState {

}

export class Contact extends BaseComponent<IContactProps, IContactState> {

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
