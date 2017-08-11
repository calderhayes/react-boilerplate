
import * as React from 'react';
import {Form, Input, SubmitButton} from './base';
import {VALIDATION_RULES} from 'view/forms/rules';
import {ValidationError} from 'view/forms/validation-error';
import {BaseComponent} from 'view/base-component';

export interface ILoginFormData {
  username: string;
  password: string;
}

export interface ILoginFormProps {
  formData: ILoginFormData;
  onChange: (formData: ILoginFormData) => void;
  onSubmit: (formData: ILoginFormData) => void;
  isLoading: boolean;
  serverErrorMessage?: string;
}

export class LoginForm extends BaseComponent<ILoginFormProps, {}> {

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
          value={this.props.formData.username}
          name='username'
          placeholder='Username'
          validations={[VALIDATION_RULES.REQUIRED]}/>

        <Input
          onChange={this.onPasswordChanged}
          className='form-control'
          errorClassName='has-error'
          placeholder='Password'
          type='password'
          value={this.props.formData.password}
          name='password'
          validations={[VALIDATION_RULES.REQUIRED]}/>

        <SubmitButton
          forceDisabled={isDisabled}
          type='button'
          className='btn btn-lg btn-primary btn-block'
          onClick={this.onClick}>Log In</SubmitButton>

      </Form>
    );

  }

  private onClick = () => {
    this.props.onSubmit(this.props.formData);
  }

  private onUsernameChanged = (e: any) => {
    const username = e.target.value;
    const data: ILoginFormData = Object.assign({}, this.props.formData);
    data.username = username;
    this.props.onChange(data);
  }

  private onPasswordChanged = (e: any) => {
    const password = e.target.value;
    const data: ILoginFormData = Object.assign({}, this.props.formData);
    data.password = password;
    this.props.onChange(data);
  }

}
