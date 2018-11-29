import { Injectable } from '@angular/core';
import { IService } from '../core.types';
// import { HttpClient } from '@angular/common/http';
export interface IApiService extends IService {}

@Injectable()
export class ApiService implements IApiService {

}
