import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public canActivate(): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    return false;
  }
}
