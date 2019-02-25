import {Component, OnInit, OnDestroy} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {RootStoreState} from '../../root-store';
import {AttemptLoginAction} from '../../root-store/auth-store/actions';
import {AuthStoreSelectors} from 'src/app/root-store/auth-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private errorMsgSubscription: Subscription;
  private store$: Store<RootStoreState.State>;

  public error: string;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(store$: Store<RootStoreState.State>) {
    this.store$ = store$;
  }

  get emailField(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.loginForm.controls.password;
  }

  public ngOnInit(): void {
    this.errorMsgSubscription = this.store$
      .select(AuthStoreSelectors.selectAuthError)
      .subscribe(error => (this.error = error));
  }

  public ngOnDestroy(): void {
    if (this.errorMsgSubscription) {
      this.errorMsgSubscription.unsubscribe();
    }
  }

  public getEmailErrorMsg(): string {
    if (this.emailField.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.emailField.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  public getPasswordErrorMsg(): string {
    if (this.passwordField.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  public submitForm(): void {
    if (this.loginForm.invalid) {
      console.log('Error: form is invalid');
      return;
    }

    this.store$.dispatch(
      new AttemptLoginAction({
        email: this.emailField.value,
        password: this.passwordField.value,
      }),
    );
  }
}
