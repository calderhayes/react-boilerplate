
import * as React from 'react';
import {BaseComponent} from './base-component';
import {DIControl} from '../di';
import {FluxExample} from './flux-example';
import {Hello} from './example';

export interface IAppProps {

}

export interface IAppState {
  value: number;
}

export class App extends BaseComponent<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.log.info('Constructing to level react component');
  }

  public render() {

    return (
      <div>

        <Hello name='John Doe' />

        <FluxExample />
      </div>);

  }

}
