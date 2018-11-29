import { Injectable } from '@angular/core';

import { IService } from '@app/core/core.types';


interface IUserService extends IService {}

@Injectable()
export abstract class AbstractUserService implements IUserService {}
