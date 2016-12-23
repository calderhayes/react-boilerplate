
import * as React from 'react';
import {BaseComponent} from '../base-component';

export interface ILoginProps {

}

export interface ILoginState {

}

export class Login extends BaseComponent<ILoginProps, ILoginState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          Login
        </div>
      </div>
    );

  }

}
