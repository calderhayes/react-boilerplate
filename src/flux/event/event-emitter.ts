import * as events from 'events';
import {EventType, EventTypeKey} from 'flux/event/event-type';
import {injectable} from 'inversify';

export interface IEventEmitter {
  on(eventType: EventTypeKey, handler: (event: EventType) => void): this;
  off(eventType: EventTypeKey, handler: (event: EventType) => void): this;
  emit(event: EventType): this;
}

@injectable()
export class EventEmitter implements IEventEmitter {

  private eventEmitter: events.EventEmitter;

  constructor() {
    this.eventEmitter = new events.EventEmitter();
  }

  public on(eventType: EventTypeKey, handler: (event: EventType) => void) {
    this.eventEmitter.on(eventType, handler);
    return this;
  }

  public off(eventType: EventTypeKey, handler: (event: EventType) => void) {
    this.eventEmitter.removeListener(eventType, handler);
    return this;
  }

  public emit(event: EventType) {
    this.eventEmitter.emit(event.type, event);
    return this;
  }

}

