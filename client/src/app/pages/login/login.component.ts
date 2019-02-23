import {Component, OnDestroy} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public errorMessage: string;

  private router: Router;
  private authService: AuthService;
  private ngUnsubscribe = new Subject();

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  get emailField(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.loginForm.controls.password;
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

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submitForm(): void {
    if (this.loginForm.invalid) {
      console.log('Error: form is invalid');
      return;
    }

    this.authService
      .attemptLogin(this.emailField.value, this.passwordField.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        _ => this.router.navigateByUrl('/courses'),
        (e: any) => {
          this.errorMessage = e.error.ErrorDescription;
        },
      );
  }
}
