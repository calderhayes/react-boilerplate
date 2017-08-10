
// import {IDispatcher} from './dispatcher';
// import {IAPIService, APIError, APIErrorType} from '../api/service';
// import {ActionLog, ILogger} from '../logging';
// import {IEventEmitter} from './event-emitter';
// import {IStore} from './store';

// export class ActionControl {

//   public static get CONSTANTS() {
//     return {
//       EXAMPLE: 'EXAMPLE',
//       LOGIN: 'LOGIN',
//       LOGOUT: 'LOGOUT',
//       APP_ROUTE_INITIALIZED: 'APP_ROUTE_INITIALIZED',
//       UNKNOWN_ERROR: 'UNKNOWN_ERROR'
//     };
//   }

//   public get CONSTANTS() {
//     return ActionControl.CONSTANTS;
//   }

//   private readonly dispatcher: IDispatcher;
//   private readonly api: IAPIService;
//   private readonly eventEmitter: IEventEmitter;
//   private readonly store: IStore;
//   private readonly log: ILogger;

//   constructor(
//     dispatcher: IDispatcher,
//     service: IAPIService,
//     eventEmitter: IEventEmitter,
//     store: IStore) {

//     this.dispatcher = dispatcher;
//     this.api = service;
//     this.eventEmitter = eventEmitter;
//     this.store = store;
//     this.log = ActionLog;
//   }

//   public async doExample() {
//     this.log.info('Doing example...');

//     this.dispatcher.dispatch(this.CONSTANTS.EXAMPLE, {
//       value: (new Date()).getTime()
//     });

//     const updatedState = this.store.getState();
//     this.eventEmitter.emit(this.CONSTANTS.EXAMPLE, {
//       value: updatedState.exampleValue
//     });

//     return await Promise.resolve();

//   }

//   public async initializeAppRoute() {
//     this.log.info('Initializing the App Route');

//     // This will likely be a batched set of API calls
//     // Or a special call to a single point which provides all
//     // the data
//     await new Promise((resolve) => {
//       const dummyTimeout = 1000;
//       setTimeout(resolve, dummyTimeout);
//     });

//     this.dispatcher.dispatch(this.CONSTANTS.APP_ROUTE_INITIALIZED, {
//       success: true
//     });

//     // const updatedState = this.store.getState();
//     this.eventEmitter.emit(this.CONSTANTS.APP_ROUTE_INITIALIZED, {
//       success: true
//     });
//   }

//   public async login(username: string, password: string): Promise<void> {
//     this.log.info('Logging in ', username);

//     try {
//       const result = await this.api.login(username, password);
//       this.dispatcher.dispatch(this.CONSTANTS.LOGIN, result);

//       // Need to allocate error from the API to translation keys
//       // the login page will append this to login_page.error. for the
//       // proper translation key

//       this.eventEmitter.emit(this.CONSTANTS.LOGIN, {
//         success: true
//       });
//     }
//     catch (error) {
//       if (error.isAPIError) {
//         const e: APIError = error;

//         if (e.apiErrorType === APIErrorType.UNAUTHENTICATED) {
//           this.dispatcher.dispatch(this.CONSTANTS.LOGOUT);
//           this.eventEmitter.emit(this.CONSTANTS.LOGIN, {
//             success: false,
//             error: 'invalid_credentials'
//           });
//           return;
//         }
//       }
//       this.unknownErrorHandler(error);
//     }
//   }

//   private unknownErrorHandler(error?: any) {
//     this.log.error('An unknown error occured', error);
//     this.eventEmitter.emit(this.CONSTANTS.UNKNOWN_ERROR, {
//       error
//     });
//   }

// }

