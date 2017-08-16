
export interface IPersistedDataItem<T> {
  exists: boolean;
  item: T|null;
  setItem(item: T): void;
  clearItem(): void;
}

export class MockedPersistedDataItem<T> implements IPersistedDataItem<T> {

    private inMemoryItem: T|null;

    public get exists(): boolean {
      return !!this.inMemoryItem;
    }

    public get item(): T|null {
      return this.inMemoryItem;
    }

    public setItem(item: T): void {
      this.inMemoryItem = item;
    }

    public clearItem(): void {
      this.inMemoryItem = null;
    }

  }
