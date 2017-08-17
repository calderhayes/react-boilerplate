
import {BaseContainer} from 'view/containers/base-container';
import {IOC_TYPE} from 'ioc/ioc-type';
import {History} from 'history';
import {lazyInject} from 'ioc';

// Handles the dependency injection
export class BaseRoute<P, S> extends BaseContainer<P, S> {

  @lazyInject(IOC_TYPE.TOASTR)
  protected readonly history: History;
}
