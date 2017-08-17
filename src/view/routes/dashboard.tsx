
import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';

export interface IDashboardProps {

}

export interface IDashboardState {

}

export class Dashboard extends BaseContainer<IDashboardProps, IDashboardState> {

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
