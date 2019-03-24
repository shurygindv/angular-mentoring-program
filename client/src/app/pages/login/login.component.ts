import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {Observable} from 'rxjs';

import {AttemptLoginAction} from '../../root-store/auth-store/actions';
import {AuthStoreSelectors} from '../../root-store/auth-store';
import { StoreService } from '../../core/services/store/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private storeService: StoreService;

  public error: Observable<string>;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(storeService: StoreService) {
    this.storeService = storeService;
  }

  get emailField(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.loginForm.controls.password;
  }

  public ngOnInit(): void {
    this.error = this.storeService
      .select(AuthStoreSelectors.selectAuthError);
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

    this.storeService.dispatch(
      new AttemptLoginAction({
        email: this.emailField.value,
        password: this.passwordField.value,
      }),
    );
  }
}
