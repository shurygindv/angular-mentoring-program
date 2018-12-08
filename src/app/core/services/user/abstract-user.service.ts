import { Injectable } from '@angular/core';

import { IService } from '../../core.types';

interface IUserService extends IService {}

@Injectable()
export abstract class AbstractUserService implements IUserService {}
