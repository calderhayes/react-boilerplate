
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';
import {LoginForm, ILoginFormData} from 'view/components/forms/login';
import {EventTypeKey, ILoginEvent} from 'flux/event';

import 'view/style/login.css';

export interface ILoginProps extends IBaseRouteProps {

}

export interface ILoginState {
  saving: boolean;
  error?: string;
  formData: ILoginFormData;
}

// Should be a container
export class Login extends BaseRoute<ILoginProps, ILoginState> {

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
    const isLoggedIn = this.store.isLoggedIn;
    this.logger.debug('Login route will mount!', isLoggedIn);
    if (isLoggedIn) {
      this.logger.info('Already logged in, redirecting to dashboard');
      this.history.push('/dashboard');
    }

    this.eventEmitter.on(EventTypeKey.LOGIN, this.loginCompleted);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.LOGIN, this.loginCompleted);
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

  private loginClicked = (data: ILoginFormData) => {
    this.setState({
      ...this.state,
      saving: true
    });

    this.actionLogic.authActionLogic.login(data.username, data.password);

    this.logger.debug('Logging in with ' + data.username);
  }

  private onChange = (data: ILoginFormData) => {
    this.setState({
      ...this.state,
      formData: data
    });
  }

  private loginCompleted = (event: ILoginEvent) => {
    if (event.result.success) {
      this.logger.debug('Login success!');
      this.history.push('/dashboard');
    }
    else {
      this.logger.debug('Login failure!');
      this.logger.debug('Re-enabling');
      this.state.formData.password = '';
      this.setState({
        ...this.state,
        formData: this.state.formData,
        error: this.translate('login_page.error.' + event.result.error),
        saving: false
      });
    }
  }

}
