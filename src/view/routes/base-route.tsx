
import {BaseContainer} from 'view/containers/base-container';
import {History} from 'history';

export interface IBaseRouteProps {
  history: History;
}

// Handles the dependency injection
export class BaseRoute<P extends IBaseRouteProps, S> extends BaseContainer<P, S> {
  protected get history() {
    return this.props.history;
  }
}
