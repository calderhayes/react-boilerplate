
import * as React from 'react';
import {BaseComponent} from './base-component';
import {DIControl} from '../di';
import {Hello} from './example';

export interface IAppProps {

}

export interface IAppState {
  value: number;
}

export class App extends BaseComponent<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    const appState = this.store.getState();
    this.state = {
      value: appState.exampleValue
    };

    this.exampleActionInvoked = this.exampleActionInvoked.bind(this);
  }

  public componentWillMount() {
    this.eventEmitter.on(this.actions.CONSTANTS.EXAMPLE, this.exampleActionInvoked);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(this.actions.CONSTANTS.EXAMPLE, this.exampleActionInvoked);
  }

  public render() {

    return (
      <div>

        <h2>Hello World!</h2>

        <button
          className='btn btn-primary'
          type='button'
          onClick={this.invokeExampleAction.bind(this)}>Example Action</button>

        <span className='bold'>{this.state.value}</span>


        <Hello name='John Doe' />
      </div>);

  }

  private invokeExampleAction() {
    this.actions.doExample();
  }

  private exampleActionInvoked() {
    this.state.value = this.store.getState().exampleValue;
    this.setState(this.state);
  }

}
