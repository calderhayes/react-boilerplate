
import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';
import {Hello} from 'view/components/example';
import {FluxExample} from 'view/containers/flux-example';

export interface IExampleProps {

}

export interface IExampleState {

}

export class Example extends BaseContainer<IExampleProps, IExampleState> {

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
