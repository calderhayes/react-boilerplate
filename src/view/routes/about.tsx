
import * as React from 'react';
import {BaseComponent} from 'view/base-component';

export interface IAboutProps {

}

export interface IAboutState {

}

export class About extends BaseComponent<IAboutProps, IAboutState> {

  public render() {

    return (
      <div className='row'>
        <div className='col-xs-12'>
          This is an about page
        </div>
      </div>
    );

  }

}
