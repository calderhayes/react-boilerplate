
import * as React from 'react';
import {BaseRoute} from 'view/routes/base-route';

export interface IDashboardProps {

}

export interface IDashboardState {

}

export class Dashboard extends BaseRoute<IDashboardProps, IDashboardState> {

  public render() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          This is an Dashboard page
          <br />
          this is translated text: {this.translate('colour')}
        </div>
      </div>
    );

  }

}
