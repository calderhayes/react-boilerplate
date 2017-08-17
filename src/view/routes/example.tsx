
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';
import {Hello} from 'view/components/example';
import {FluxExample} from 'view/containers/flux-example';

export interface IExampleProps extends IBaseRouteProps {

}

export interface IExampleState {

}

export class Example extends BaseRoute<IExampleProps, IExampleState> {

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
