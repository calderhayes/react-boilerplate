
import * as React from 'react';
import {StateControl} from '../flux/control';

const {
  eventEmitter,
  store,
  actionControl
} = StateControl;


export interface IAppProps {

}

export interface IAppState {
  value: number;
}

export class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    let appState = store.getState();
    this.state = {
      value: appState.exampleValue
    };

    this.exampleActionInvoked = this.exampleActionInvoked.bind(this);
  }

  public componentWillMount() {
    eventEmitter.on(actionControl.CONSTANTS.EXAMPLE, this.exampleActionInvoked);
  }

  public componentWillUnmount() {
    eventEmitter.off(actionControl.CONSTANTS.EXAMPLE, this.exampleActionInvoked);
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

      </div>);

  }

  private invokeExampleAction() {
    actionControl.doExample();
  }

  private exampleActionInvoked() {
    this.state.value = store.getState().exampleValue;
    this.setState(this.state);
  }

}
