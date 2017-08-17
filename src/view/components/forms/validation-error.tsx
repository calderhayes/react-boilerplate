
import * as React from 'react';
import * as cx from 'classnames';

import 'view/style/forms/validation-error.css';

export interface IValidationErrorProps {
  message: string;
  isSmall?: boolean;
}

export interface IValidationErrorState {

}

export class ValidationError extends React.Component<IValidationErrorProps, IValidationErrorState> {

  public render() {

    const className = cx('alert', 'alert-danger', {
      'alert-small': this.props.isSmall || false
    });

    return (
      <div className={className} role='alert'>
        <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
        <span className='sr-only'>Error:</span>
        &nbsp;{this.props.message}
      </div>
    );

  }

}
