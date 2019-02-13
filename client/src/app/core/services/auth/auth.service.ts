import {Injectable} from '@angular/core';
import {ReplaySubject, Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {ApiService} from '../api.service';

interface UserInfo {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService: ApiService;

  private currentUserSubject: BehaviorSubject<UserInfo> = new BehaviorSubject<
    UserInfo
  >({} as UserInfo);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public currentUser = this.currentUserSubject.asObservable();
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

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

  public getFullUserInfo(): Observable<any> {
    const id = this.currentUserSubject.value.id;

    return this.apiService.get(`/auth/info/${id}`);
  }

  public attemptLogin(email: string, password: string): Observable<any> {
    return this.apiService
      .post('/auth/login', {
        login: email,
        password: password,
      })
      .pipe(
        map(result => {
          this.setAuth(result.Data); // todo request result wrapper
        }),
      );
  }

  public logout(): void {
    this.currentUserSubject.next({} as UserInfo);
    this.isAuthenticatedSubject.next(false);
  }
}
