import { MaybeNull } from '../../types';
import fakeAuthInfoDatabase from './fake-db.json';
import { AuthorizationDeniedError } from '../../helpers/authorization-denied';

type User = {
  id: number;
  login: string;
  password: string;
  fakeToken: string;
  name: {
    first: string;
    last: string;
  };
};

export interface IAuthorizationService {
  login(login: string, password: string): Promise<any>; // avoid any

  findUserById(id: number): Promise<MaybeNull<User>>;
  findUserByLogin(login: string): Promise<MaybeNull<User>>;
}

const users: User[] = fakeAuthInfoDatabase.users; // todo user type

const promisify = (data: any) => Promise.resolve(data);

export class AuthorizationService implements IAuthorizationService {
  // todo user service
  async findUserById(id: number): Promise<MaybeNull<User>> {
    return await promisify(users.find(user => user.id === id) || null);
  }

  // todo user service
  async findUserByLogin(login: string): Promise<MaybeNull<User>> {
    return await promisify(users.find(user => user.login === login) || null);
  }

  async login(login: string, password: string): Promise<any> {
    const userInfo = await this.findUserByLogin(login);

    if (!userInfo) {
      throw new AuthorizationDeniedError("Such user isn't created yet");
    }

    if (userInfo.password === password) {
      return await promisify({
        token: userInfo.fakeToken,
        firstName: userInfo.name.first,
        lastName: userInfo.name.first
      });
    }

    throw new AuthorizationDeniedError("Typed password doesn't match");
  }
}
