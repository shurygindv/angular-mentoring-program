// TODO: adaptate for rxjs
export interface ICrud<T> {
  create(item: T): T;
  getById(id: string): T; // read
  update(id: string, item: T);
  delete(id: string): void;
}
