
import * as React from 'react';
import {BaseComponent} from '../base-component';

import '../style/login.css';

export interface ILoginProps {

}

export interface ILoginState {
  saving: boolean;
}

export class Login extends BaseComponent<ILoginProps, ILoginState> {

  public refs: {
    [key: string]: Element;
    username: HTMLInputElement;
    password: HTMLInputElement;
  };

  private loginClicked = (() => {

    this.state.saving = true;
    this.setState(this.state);

    const username = this.refs.username.value;
    const password = this.refs.password.value;

    this.actions.login(username, password)
      .finally(() => {
        this.log.debug('Re-enabling');
        this.state.saving = false;
        this.setState(this.state);
      });

    this.log.debug('Logging in with ' + username);

  }).bind(this);

  private loginCompleted = ((result: {success: boolean}) => {
    if (result.success) {
      this.log.debug('Login success!');
    }
    else {
      this.log.debug('Login failure!');
    }
  }).bind(this);

  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      saving: false
    };
  }

  public componentWillMount() {
    this.eventEmitter.on(this.actions.CONSTANTS.LOGIN, this.loginCompleted);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(this.actions.CONSTANTS.LOGIN, this.loginCompleted);
  }

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
                <button
                  onClick={this.loginClicked}
                  className='btn btn-lg btn-primary btn-block'
                  type='button'
                  disabled={this.state.saving}>
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
