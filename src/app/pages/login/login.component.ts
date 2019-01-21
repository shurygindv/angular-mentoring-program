import {Component} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly authService: AuthService) {}

  get emailField(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.loginForm.controls.password;
  }

  public getEmailErrorMsg() {
    if (this.emailField.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.emailField.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  public getPasswordErrorMsg() {
    if (this.passwordField.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  public submitForm() {
    if (this.loginForm.invalid) {
      console.log('Error: form is invalid');
      return;
    }

    this.authService.login(this.emailField.value, this.passwordField.value);
  }
}
