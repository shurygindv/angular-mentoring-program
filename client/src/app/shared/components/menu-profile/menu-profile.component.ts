import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuProfileComponent {
  @Output() public logout = new EventEmitter<null>();

  public logoutUser($event: Event) {
    this.logout.emit();
  }
}
