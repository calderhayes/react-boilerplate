
import * as React from 'react';
import * as cx from 'classnames';

export interface IButtonProps {
  errorClassName?: string;
  className?: string;
  forceDisabled?: boolean;
  type?: string;
  onClick?: any;
}

export interface IButtonState {

}

export class Button extends React.Component<IButtonProps, IButtonState> {

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

        const { errorClassName, className, ...rest } = this.props;
        const isDisabled = this.props.forceDisabled || !!Object.keys(this.context.errors).length;

        const c = cx({
                  [className]: !!className,
                  [errorClassName]: isDisabled && !!errorClassName
                });

        return (
            <button
              className={c}
              disabled={isDisabled}
              {...rest}
            >{this.props.children}</button>
        );
    }
}
