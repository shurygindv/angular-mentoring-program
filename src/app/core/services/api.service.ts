import { Injectable } from '@angular/core';
import { IService } from '../core.types';

export interface IApiService extends IService {}

@Injectable()
export class ApiService implements IApiService {

}
