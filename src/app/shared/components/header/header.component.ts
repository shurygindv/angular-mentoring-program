import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly authService: AuthService) {}

  public showProfile() {
    return this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
  }
}
