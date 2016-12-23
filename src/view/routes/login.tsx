
import * as React from 'react';
import {BaseComponent} from '../base-component';

import '../style/login.css';

export interface ILoginProps {

}

export interface ILoginState {

}

export class Login extends BaseComponent<ILoginProps, ILoginState> {

  public refs: {
    [key: string]: Element;
    username: HTMLInputElement;
    password: HTMLInputElement;
  };

  private loginClicked = (() => {

    const username = this.refs.username.value;
    const password = this.refs.password.value;

    this.actions.login(username, password);

    this.log.debug('Logging in with ' + username);

  }).bind(this);

  public render() {

    const imgUrl = 'https://lh5.googleusercontent.com' +
      '/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120';

    return (
      <div className='row'>
        <div className='col-sm-6 col-md-4 col-md-offset-4'>
            <h1 className='text-center login-title'>Sign In</h1>
            <div className='account-wall'>
                <img
                  className='profile-img'
                  src={imgUrl}
                  alt='Temp Image' />
                <form className='form-signin'>
                <input ref='username' type='text' className='form-control' placeholder='Email' required />
                <input ref='password' type='password' className='form-control' placeholder='Password' required />
                <button onClick={this.loginClicked} className='btn btn-lg btn-primary btn-block' type='button'>
                    Sign in
                </button>
                </form>
            </div>
            <a href='#' className='text-center new-account'>Create an account </a>
          </div>
      </div>
    );

  }

}
