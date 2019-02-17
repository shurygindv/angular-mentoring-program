import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {
  AuthService,
  UserFullInfo,
} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router: Router;
  private authService: AuthService;
  private ngUnsubscribe = new Subject();

  public isAuthenticated: boolean;
  public userName: string;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public fetchUserInfo() {
    this.authService
      .getFullUserInfo()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((info: UserFullInfo) => {
        this.userName = `${info.name.first} ${info.name.last}`;
      });
  }

  public ngOnInit() {
    this.authService.isAuthenticated
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: boolean) => {
        this.isAuthenticated = value;

        if (this.isAuthenticated) {
          this.fetchUserInfo();
        }
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
