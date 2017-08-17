
import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';
import { IAppState } from 'data';

export interface IFluxExampleProps {

}

export interface IFluxExampleState {
  value: number;
}

export class FluxExample extends BaseContainer<IFluxExampleProps, IFluxExampleState> {

  constructor(props: IFluxExampleProps) {
    super(props);

    const appState = this.store.state;
    this.state = {
      value: appState.exampleValue
    };
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

  protected updateLocalState(appState: IAppState, _: IFluxExampleState): IFluxExampleState {
    return {
      value: appState.exampleValue
    };
  }

  private invokeExampleAction = () => {
    this.actionLogic.exampleActionLogic.doExample();
  }

}
