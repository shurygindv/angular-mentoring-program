// TODO: adaptate for rxjs
export interface ICrud<T> {
  create(item: T): T;
  getById(id: number): T; // read
  update(id: number, item: T);
  delete(id: number): void;
}
