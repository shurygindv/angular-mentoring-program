import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService as IAuthService} from './auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private isAuth: boolean;
  private userLogin: string;

  constructor(private readonly router: Router) {}

  public login(email: string, password: string): void {
    console.log(`Success: ${email}, ${password}`);

    if (email === 'd@d.ru' && password === '123') {
      this.userLogin = email;
      this.isAuth = true;

      this.router.navigateByUrl('/courses');
    }
  }

  public logout(): void {
    this.isAuth = false;
    this.router.navigateByUrl('/login');
  }

  public isAuthenticated(): boolean {
    return this.isAuth;
  }

  public getUserInfo(): string {
    return this.userLogin;
  }
}
