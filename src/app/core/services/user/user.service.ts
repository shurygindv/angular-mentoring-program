import {Injectable} from '@angular/core';

import {UserService as IUserService} from './user-service.interface';

@Injectable()
export class UserService implements IUserService {}