
import * as React from 'react';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';

export interface IDashboardProps extends IBaseRouteProps {

}

export interface IDashboardState {

}

export class Dashboard extends BaseRoute<IDashboardProps, IDashboardState> {

  public componentWillMount() {
    if (!this.store.isLoggedIn) {
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
          <br />
          This is a signalr test
          <button type='button' className='btn btn-info' onClick={this.sayHiClicked}>
            Say Hello to concurrent users!
          </button>
        </div>
      </div>
    );
  }

  private sayHiClicked = () => {
    this.actionLogic.exampleActionLogic.sayHello();
  }
}
