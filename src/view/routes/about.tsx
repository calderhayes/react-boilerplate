
import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';

export interface IAboutProps {

}

export interface IAboutState {

}

export class About extends BaseContainer<IAboutProps, IAboutState> {

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
