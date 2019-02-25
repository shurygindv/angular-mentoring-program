import {Injectable} from '@angular/core';
import {ReplaySubject, Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserInfo, UserFullInfo} from './auth.interface';
import {ApiService} from '../api.service';
import {Response} from '../../types';

// TODO: make normal auth service

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService: ApiService;

  private currentUserSubject: BehaviorSubject<UserInfo> = new BehaviorSubject<
    UserInfo
  >({} as UserInfo);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public currentUser: Observable<
    UserInfo
  > = this.currentUserSubject.asObservable();
  public isAuthenticated: Observable<
    boolean
  > = this.isAuthenticatedSubject.asObservable();

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  private setAuth(data: UserInfo): void {
    this.currentUserSubject.next(data);
    this.isAuthenticatedSubject.next(true);
  }

  public getUserInfo(): UserInfo {
    return this.currentUserSubject.value;
  }

  public getFullUserInfo(): Observable<UserFullInfo> {
    const id: string = this.currentUserSubject.value.id;

    return this.apiService
      .get(`/auth/userInfo/${id}`)
      .pipe(map((result: Response<UserFullInfo>) => result.Data));
  }

  public attemptLogin(email: string, password: string): Observable<UserInfo> {
    return this.apiService
      .post('/auth/login', {
        login: email,
        password: password,
      })
      .pipe(
        map(result => {
          this.setAuth(result.Data); // todo request result wrapper
          return result.Data;
        }),
      );
  }

  public logout(): void {
    this.currentUserSubject.next({} as UserInfo);
    this.isAuthenticatedSubject.next(false);
  }
}
