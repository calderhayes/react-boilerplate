
import * as React from 'react';
import {Form, Input, Button} from './base';
import {VALIDATION_RULES} from './rules';

export interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
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

    return (
      <Form className='form-signin'>

        <Input
          ref='username'
          className='form-control'
          value=''
          name='username'
          placeholder='Username'
          validations={[VALIDATION_RULES.REQUIRED]}/>

        <Input
          ref='password'
          className='form-control'
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
