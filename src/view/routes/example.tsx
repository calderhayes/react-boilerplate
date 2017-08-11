
import * as React from 'react';
import {BaseComponent} from 'view/base-component';
import {Hello} from 'view/components/example';
import {FluxExample} from 'view/components/flux-example';

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
