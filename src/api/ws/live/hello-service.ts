import {IHelloService} from 'api/interface';

declare const $: any;

interface IHelloHubServer {
  sayHello(): Promise<void>;
}

interface IHelloHubClient {
  someoneSaidHi: (username: string) => void;
}

export class HelloService implements IHelloService {

  private get helloHubServer(): IHelloHubServer {
    return $.connection.helloHub.server;
  }

  private get helloHubClient(): IHelloHubClient {
    return $.connection.helloHub.client;
  }

  public async sayHello() {
    return this.helloHubServer.sayHello();
  }

  public registerSomeoneSaidHi(handler: (username: string) => void) {
    this.helloHubClient.someoneSaidHi = handler;
  }

}
