
import * as React from 'react';
import {BaseComponent} from '../base-component';

export interface IDashboardProps {

}

export interface IDashboardState {

}

export class Dashboard extends BaseComponent<IDashboardProps, IDashboardState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          This is an Dashboard page
        </div>
      </div>
    );

  }

}
