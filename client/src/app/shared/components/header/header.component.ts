import {Component, OnInit, OnDestroy} from '@angular/core';

import {AuthService} from '../../../core/services/auth/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router: Router;
  private authService: AuthService;
  private isAuthenticated: boolean;
  private authSubscription: Subscription;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated.subscribe(
      (value: boolean) => {
        this.isAuthenticated = value;
      },
    );
  }

  public ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
