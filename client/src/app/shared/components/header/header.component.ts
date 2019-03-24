import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {AuthStoreSelectors} from '../../../root-store/auth-store';
import {
  LogoutAction,
  FetchUserInfoAction,
} from '../../../root-store/auth-store/actions';
import {StoreService} from '../../../core/services/store/store.service';

const COURSES_URL_PART = '/courses';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router: Router;
  private userInfoSubscription: Subscription;
  private storeService: StoreService;

  public isAuthenticated: boolean;
  public userName: string;

  constructor(storeService: StoreService, router: Router) {
    this.storeService = storeService;
    this.router = router;
  }

  public canAddCourse(): boolean {
    return this.router.url === COURSES_URL_PART;
  }

  public fetchUserInfo(): void {
    this.storeService.dispatch(new FetchUserInfoAction(undefined));
  }

  public updateAuthFlag(): void {
    this.storeService
      .select(AuthStoreSelectors.selectAuthFlag)
      .subscribe((isAuth: boolean) => {
        this.isAuthenticated = isAuth;

        if (this.isAuthenticated) {
          this.fetchUserInfo();
        }
      });
  }

  private subscribeOnUserInfo(): void {
    this.userInfoSubscription = this.storeService
      .select(AuthStoreSelectors.selectUserInfo)
      .subscribe((info: any) => {
        if (!info) { // todo map(filter())
          return;
        }

        this.userName = `${info.firstName} ${info.lastName}`;
      });
  }

  public ngOnInit(): void {
    this.subscribeOnUserInfo();
    this.updateAuthFlag();
  }

  public ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

  public logout(): void {
    this.storeService.dispatch(new LogoutAction());
  }
}
