
import * as React from 'react';
import {Form, Input, Button} from './base';
import {VALIDATION_RULES} from './rules';
import {ValidationError} from './validation-error';

export interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
  serverErrorMessage?: string;
}

export interface ILoginFormState {

}

export class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

  public refs: {
    [key: string]: Element;
    username: HTMLInputElement;
    password: HTMLInputElement;
  };

  private onClick = (() => {
    this.props.onSubmit(this.refs.username.value, this.refs.password.value);
  }).bind(this);

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
          ref='username'
          className='form-control'
          errorClassName='has-error'
          value=''
          name='username'
          placeholder='Username'
          validations={[VALIDATION_RULES.REQUIRED]}/>

        <Input
          ref='password'
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
