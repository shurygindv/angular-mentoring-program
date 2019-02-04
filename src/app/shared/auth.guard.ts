import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public canActivate(): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
