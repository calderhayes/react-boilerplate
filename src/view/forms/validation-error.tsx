
import * as React from 'react';

export interface IValidationErrorProps {
  message: string;
}

export interface IValidationErrorState {

}

export class ValidationError extends React.Component<IValidationErrorProps, IValidationErrorState> {

  public render() {

    return (
      <div className='alert alert-danger' role='alert'>
        <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
        <span className='sr-only'>Error:</span>
        &nbsp;{this.props.message}
      </div>
    );

  }

}
