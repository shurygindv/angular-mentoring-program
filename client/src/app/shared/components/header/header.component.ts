import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {RootStoreState} from 'src/app/root-store';
import {AuthStoreSelectors} from 'src/app/root-store/auth-store';
import {
  LogoutAction,
  FetchUserInfoAction,
} from '../../../root-store/auth-store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router: Router;
  private userInfoSubscription: Subscription;
  private store$: Store<RootStoreState.State>;

  public isAuthenticated: boolean;
  public userName: string;

  constructor(store$: Store<RootStoreState.State>, router: Router) {
    this.store$ = store$;
    this.router = router;
  }

  public fetchUserInfo(): void {
    this.store$.dispatch(new FetchUserInfoAction());
  }

  public updateAuthFlag(): void {
    this.store$
      .select(AuthStoreSelectors.selectAuthFlag)
      .subscribe((isAuth: boolean) => {
        console.log('11');
        this.isAuthenticated = isAuth;

        if (this.isAuthenticated) {
          this.fetchUserInfo();
        }
      });
  }

  private subscribeOnUserInfo(): void {
    this.userInfoSubscription = this.store$
      .select(AuthStoreSelectors.selectUserInfo)
      .subscribe((info: any) => {
        if (!info) {
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
    this.store$.dispatch(new LogoutAction());
  }
}
