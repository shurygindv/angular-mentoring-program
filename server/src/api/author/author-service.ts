import { authors as dbAuthors } from './fake-db.json';
import { MaybeNull } from '../../types';

type Author = {
  id: string;
  name: string;
  description?: string;
};

const promisify = <T>(data: T): Promise<T> => Promise.resolve(data);

export interface IAuthorService {
  findAuthorById(id: string): Promise<MaybeNull<Author>>;
  findAuthors(): Promise<Author[]>;
}

export class AuthorService implements IAuthorService {
  async findAuthorById(id: string): Promise<MaybeNull<Author>> {
    return await promisify(
      dbAuthors.find((author: Author) => author.id === id) || null
    );
  }

  async findAuthors(): Promise<Author[]> {
    return await promisify([...dbAuthors]);
  }
}
