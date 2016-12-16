
import * as React from 'react';
import {Store, AppEmitter} from '../flux/store';
import {doExample} from '../flux/actions';
import {ActionConstants} from '../flux/constants';

export interface IAppProps {

}

export interface IAppState {
  value: number;
}

export class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      value: Store.exampleValue
    };
  }

  componentWillMount() {
    AppEmitter.on(ActionConstants.EXAMPLE, this.exampleActionInvoked.bind(this));
  }

  componentWillUnmount() {
    AppEmitter.off(ActionConstants.EXAMPLE, this.exampleActionInvoked.bind(this));
  }

  render() {

    return (
      <div>

        <h2>Hello World!</h2>

        <button className='btn btn-primary' type='button' onClick={this.invokeExampleAction.bind(this)}>Example Action</button>

        <span className='bold'>{this.state.value}</span>

      </div>);

  }

  private invokeExampleAction() {
    doExample();
  }

  private exampleActionInvoked() {
    this.state.value = Store.exampleValue;
    this.setState(this.state);
  }

}
