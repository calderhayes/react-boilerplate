
import * as React from 'react';
import * as cx from 'classnames';
import {BaseComponent} from '../base-component';

export interface ISubmitButtonProps {
  errorClassName?: string;
  className?: string;
  forceDisabled?: boolean;
  type?: string;
  onClick?: any;
}

export interface ISubmitButtonState {

}

export class SubmitButton extends BaseComponent<ISubmitButtonProps, ISubmitButtonState> {

  public static propTypes = {
    children: React.PropTypes.node,
    errorClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    forceDisabled: React.PropTypes.bool
  };

  public static contextTypes = {
    errors: React.PropTypes.objectOf(React.PropTypes.array)
  };

  public render() {

    const { errorClassName, className } = this.props;
    const isDisabled = this.props.forceDisabled || !!Object.keys((this.context as any).errors).length;

    const c = cx({
      [className]: !!className,
      [errorClassName]: isDisabled && !!errorClassName
    });

    return (
      <button
        className={c}
        disabled={isDisabled}
        type={this.props.type || 'button'}
        onClick={this.props.onClick}
      >{this.props.children}</button>
    );
  }
}
