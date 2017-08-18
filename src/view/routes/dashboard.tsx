
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';

export interface IDashboardProps extends IBaseRouteProps {

}

export interface IDashboardState {

}

export class Dashboard extends BaseRoute<IDashboardProps, IDashboardState> {

  public componentWillMount() {
    if (this.store.isLoggedIn) {
      // navigate out of here
      this.history.push('/login');
    }
  }

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
