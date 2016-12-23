
import * as React from 'react';
import {BaseComponent} from '../base-component';
import {Hello} from '../components/example';
import {FluxExample} from '../components/flux-example';

export interface IExampleProps {

}

export interface IExampleState {

}

export class Example extends BaseComponent<IExampleProps, IExampleState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <Hello name='John Doe' />
          <FluxExample />
        </div>
      </div>
    );

  }

}
