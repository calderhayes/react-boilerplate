
export interface IPersistedDataItem<T> {
  exists: boolean;
  item: T|null;
  setItem(item: T): void;
  clearItem(): void;
}

export class LocalStoragePersistedDataItem<T> implements IPersistedDataItem<T> {

  public readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get exists(): boolean {
    return !!localStorage.getItem(this.key);
  }

  public get item(): T|null {
    const serialized = localStorage.getItem(this.key);

    if (serialized === null) {
      return null;
    }

    try {
      return JSON.parse(serialized);
    }
    catch (_) {
      return null;
    }
  }

  public setItem(item: T): void {
    const serialized = JSON.stringify(item);
    localStorage.setItem(this.key, serialized);
  }

  public clearItem(): void {
    localStorage.removeItem(this.key);
  }

}
