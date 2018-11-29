import { Injectable } from '@angular/core';

import { IService } from '../core.types';

export interface IUserInterface extends IService {}

@Injectable()
export class UserService implements IUserInterface {}
