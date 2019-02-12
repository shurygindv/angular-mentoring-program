import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {LocalStorage, Storage} from '../../../helpers/storage';

interface UserPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLogin: string;

  private router: Router;
  private session: UserPayload;
  private storage: Storage<UserPayload>;

  constructor(router: Router) {
    this.router = router;

    this.storage = new LocalStorage();
    this.session = null;
  }

  private save(email: string, password: string): void {
    this.storage.set(email, {
      email,
      password,
    });
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('/courses');
  }

  private navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  private setSession(email: string, password: string): void {
    this.session = {
      email,
      password,
    };
  }

  private isAuth(email: string, password: string): boolean {
    const user = this.getUserInfo(email || this.userLogin);

    return !!(user && user.password === password);
  }

  public login(email: string, password: string): void {
    console.log(`Success: ${email}, ${password}`);

    this.save(email, password); // just save and continue ;)

    if (this.isAuth(email, password)) {
      this.navigateToHome();
      this.setSession(email, password);
    }
  }

  public logout(): void {
    this.storage.remove(this.session.email);
    this.session = null;

    this.navigateToLogin();
  }

  public isAuthenticated(): boolean {
    if (this.session) {
      return this.isAuth(this.session.email, this.session.password);
    }

    return false;
  }

  public getUserInfo(email: string): UserPayload {
    return this.storage.get(email);
  }
}