import {IHelloService} from 'api/interface';

export class MockHelloService implements IHelloService {

  public async sayHello() {
    return Promise.resolve();
  }

  public registerSomeoneSaidHi(_: (username: string) => void) {
    // Do nothing
  }

}
