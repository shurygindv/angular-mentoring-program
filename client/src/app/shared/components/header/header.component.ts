import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private router: Router;
  private authService: AuthService;

  public isAuthenticated: boolean;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public ngOnInit() {
    this.authService.isAuthenticated.pipe(first()).subscribe(
      (value: boolean) => {
        this.isAuthenticated = value;
      },
    );
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
