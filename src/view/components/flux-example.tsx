
import * as React from 'react';
import {BaseComponent} from 'view/base-component';
import {EventTypeKey} from 'flux/event';

export interface IFluxExampleProps {

}

export interface IFluxExampleState {
  value: number;
}

export class FluxExample extends BaseComponent<IFluxExampleProps, IFluxExampleState> {

  constructor(props: IFluxExampleProps) {
    super(props);

    const appState = this.store.state;
    this.state = {
      value: appState.exampleValue
    };
  }

  public componentWillMount() {
    this.eventEmitter.on(EventTypeKey.EXAMPLE, this.exampleActionInvoked);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.EXAMPLE, this.exampleActionInvoked);
  }

  public render() {

    return (
      <div>

        <h2>Hello World!</h2>

        <button
          className='btn btn-primary'
          type='button'
          onClick={this.invokeExampleAction}>Example Action</button>

        <span className='bold'>{this.state.value}</span>

      </div>);

  }

  private invokeExampleAction = () => {
    this.actionLogic.exampleActionLogic.doExample();
  }

  private exampleActionInvoked = () => {
    this.setState({
      ...this.state,
      value: this.store.state.exampleValue
    });
  }

}
