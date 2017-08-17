
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as cx from 'classnames';
import {BaseContainer} from 'view/containers/base-container';

export interface ISubmitButtonProps {
  errorClassName?: string;
  className?: string;
  forceDisabled?: boolean;
  type?: string;
  onClick?: any;
}

export interface ISubmitButtonState {

}

export class SubmitButton extends BaseContainer<ISubmitButtonProps, ISubmitButtonState> {

  public static propTypes = {
    children: PropTypes.node,
    errorClassName: PropTypes.string,
    className: PropTypes.string,
    forceDisabled: PropTypes.bool
  };

  public static contextTypes = {
    errors: PropTypes.objectOf(PropTypes.array)
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
