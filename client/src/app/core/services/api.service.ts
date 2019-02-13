import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../core/config';

@Injectable()
export class ApiService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public get(
    path: string,
    params: HttpParams = new HttpParams(), // just wrapper over http.get
  ): Observable<any> {
    return this.http.get(`${environment.API_BASE}${path}`, {params});
  }

  public post(path: string, body: any): Observable<any> {
    return this.http.post(`${environment.API_BASE}${path}`, body);
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.API_BASE}${path}`, body);
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(`${environment.API_BASE}${path}`);
  }
}
