
import * as React from 'react';
import {SubmitButton} from './submit-button';

import '../style/forms/base.css';

export interface IFormProps {
  className?: string;
}

export interface IForm extends React.ComponentClass<IFormProps> {

}

export interface IInputProps {
  onChange?: Function;
  disabled?: boolean;
  errorClassName?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  validations?: Array<string>;
}

export interface IInput extends React.ComponentClass<IInputProps> {

}

/*export interface IButtonProps {
  disabled?: boolean;
  type: string;
  className?: string;
  onClick?: Function;
}

export interface IButton extends React.ComponentClass<IButtonProps> {

}*/

interface IReactValidation {
  components: {
    Input: IInput,
    Button: SubmitButton,
    Form: IForm
  };
  rules: any;
}

// Here we are using react-validation-temp because of: https://github.com/Lesha-spr/react-validation/pull/100
// not being pulled by the maintainer
// tslint:disable-next-line:no-var-requires no-require-imports
const Validation: IReactValidation = require('react-validation-temp').default;
const rules = Validation.rules;
const {Input, Form} = Validation.components;

export {
  rules,
  Input,
  SubmitButton,
  Form
}
