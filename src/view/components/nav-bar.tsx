
import * as React from 'react';
import {BaseComponent} from '../base-component';
// import {Link, IndexLink} from 'react-router';
 // tslint:disable-next-line:no-var-requires no-require-imports
import { Link } from 'react-router-dom';

export interface INavBarProps {

}

export interface INavBarState {

}

export class NavBar extends BaseComponent<INavBarProps, INavBarState> {

  public render() {

    return (
      <nav
        className='navbar navbar-inverse navbar-fixed-top'
        role='navigation'>
        <div className='container'>
          <div className='navbar-header'>
            <button type='button'
            className='navbar-toggle'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='/'>
              Home (brand here)
            </Link>
          </div>
          <div
            className='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'>

            <ul className='nav navbar-nav'>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/example'>Example</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

  }

}
