
export interface IStore<S> {
  state: S;
  updateState(state: S): void;
}

export class BaseStore<S> implements IStore<S> {

  public get state() {
    return this._state;
  }

  private _state: S;

  constructor(initialState: S) {
    this.updateState(Object.freeze(initialState));
  }

  public updateState(newState: S): void {
    this._state = newState;
  }

}
