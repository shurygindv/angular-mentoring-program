import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(first());
  }
}
