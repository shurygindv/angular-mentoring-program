import { authors as dbAuthors } from './fake-db.json';
import { MaybeNull } from '../../types';

type Author = {
  id?: string;
  firstName: string;
  lastName: string;
};

const mappedAuthors = dbAuthors.map(item => {
  const [firstName, lastName] = item.name.split(' ');

  return {
    id: item.id,
    firstName,
    lastName
  };
});

const promisify = <T>(data: T): Promise<T> => Promise.resolve(data);

let ID = 100;

export interface IAuthorService {
  findAuthorById(id: string): Promise<MaybeNull<Author>>;
  findAuthors(): Promise<Author[]>;

  addAuthor(author: Author): Promise<Author>;
}

export class AuthorService implements IAuthorService {
  async findAuthorById(id: string): Promise<MaybeNull<Author>> {
    return await promisify(
      mappedAuthors.find((author: Author) => author.id === id) || null
    );
  }

  async addAuthor (author: Author): Promise<Author> {
    const newAuthor = {
      ...author,
      id: `${++ID}`,
    };

    mappedAuthors.push(newAuthor);

    return await promisify(newAuthor);
  }

  async findAuthors(): Promise<Author[]> {
    return await promisify([...mappedAuthors]);
  }
}
