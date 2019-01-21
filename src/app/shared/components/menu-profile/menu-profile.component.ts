import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],
})
export class MenuProfileComponent {
  @Output() public logout = new EventEmitter<null>();

  public logoutUser() {
    this.logout.emit(null);
  }
}
