import {Component} from '@angular/core';

import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
  }
}
