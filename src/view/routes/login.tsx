
import * as React from 'react';
import {BaseComponent} from '../base-component';
import {LoginForm, ILoginFormData} from '../forms/login';

import '../style/login.css';

export interface ILoginProps {

}

export interface ILoginState {
  saving: boolean;
  error?: string;
  formData: ILoginFormData;
}

export class Login extends BaseComponent<ILoginProps, ILoginState> {

  private loginClicked = ((data: ILoginFormData) => {
    this.setState({
      ...this.state,
      saving: true
    });

    this.actions.login(data.username, data.password);

    this.log.debug('Logging in with ' + data.username);
  }).bind(this);

  private onChange = ((data: ILoginFormData) => {
    this.setState({
      ...this.state,
      formData: data
    });
  }).bind(this);

  private loginCompleted = ((result: {success: boolean, error: string}) => {
    if (result.success) {
      this.log.debug('Login success!');
      this.history.push('dashboard');
    }
    else {
      this.log.debug('Login failure!');
      this.log.debug('Re-enabling');
      this.state.formData.password = '';
      this.setState({
        ...this.state,
        formData: this.state.formData,
        error: this.translate('login_page.error.' + result.error),
        saving: false
      });
    }
  }).bind(this);

  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      saving: false,
      formData: {
        username: '',
        password: ''
      }
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
                <LoginForm
                  formData={this.state.formData}
                  onSubmit={this.loginClicked}
                  onChange={this.onChange}
                  isLoading={this.state.saving}
                  serverErrorMessage={this.state.error} />
            </div>
            <a href='#' className='text-center new-account'>Create an account </a>
          </div>
      </div>
    );

  }

}
