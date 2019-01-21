export interface Storage<T> {
  get(key: string): T;
  has(key: string): boolean;
  remove(key: string): void;
  set(key: string, value: T): void;
}

export class LocalStorage<T> implements Storage<T> {
  public set(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public has(key: string): boolean {
    return Boolean(this.get(key));
  }

  public get(key: string): T {
    const value = window.localStorage.getItem(key);

    return JSON.parse(value);
  }

  public remove(key: string): void {
    window.localStorage.removeItem(key);
  }
}
