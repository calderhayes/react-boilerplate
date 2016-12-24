
import * as React from 'react';
import {Form, Input, Button} from './base';
import {VALIDATION_RULES} from './rules';
import {ValidationError} from './validation-error';
import {BaseComponent} from '../base-component';

export interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
  serverErrorMessage?: string;
}

export interface ILoginFormState {
  username: string;
  password: string;
}

export class LoginForm extends BaseComponent<ILoginFormProps, ILoginFormState> {

  private onClick = (() => {
    this.props.onSubmit(this.state.username, this.state.password);
  }).bind(this);

  // TODO: Better strategy for this?
  // TODO: Get proper type?
  private onUsernameChanged = ((e: any) => {
    this.state.username = e.target.value;
    this.setState(this.state);
  }).bind(this);

  private onPasswordChanged = ((e: any) => {
    this.state.password = e.target.value;
    this.setState(this.state);
  }).bind(this);

  constructor(props: ILoginFormProps) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  public render() {

    const isDisabled = this.props.isLoading;

    let serverError: JSX.Element = null;
    if (!!this.props.serverErrorMessage) {
      serverError = <ValidationError message={this.props.serverErrorMessage} />;
    }

    return (
      <Form className='form-signin'>
        {serverError}
        <Input
          onChange={this.onUsernameChanged}
          className='form-control'
          errorClassName='has-error'
          value=''
          name='username'
          placeholder='Username'
          validations={[VALIDATION_RULES.REQUIRED]}/>

        <Input
          onChange={this.onPasswordChanged}
          className='form-control'
          errorClassName='has-error'
          placeholder='Password'
          type='password'
          value=''
          name='password'
          validations={[VALIDATION_RULES.REQUIRED]}/>

        <Button
          forceDisabled={isDisabled}
          type='button'
          className='btn btn-lg btn-primary btn-block'
          onClick={this.onClick}>Log In</Button>

      </Form>
    );

  }

}
