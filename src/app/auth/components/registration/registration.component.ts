import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ValidationErrors, ValidatorFn, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { catchError, of, tap, throwError, BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public hidePassword = true;
  public hideConfirmPassword = true;
  public isLoadingForm$ = new BehaviorSubject<boolean>(false);
  public form!: FormGroup;

  private subscribe$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscribe$.unsubscribe();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.required],
    }, { validators: passwordMatchValidator });
  }

  get confirmPassword() { return this.form.get('confirmPassword'); }

  create(): void {
    this.isLoadingForm$.next(true);
    const formData: any = {
      ...this.form.value,
      confirmPassword: this.form.value.password,
    };

    this.subscribe$.add(
      this.authService.register(formData).pipe(
        tap(() => {
          this.isLoadingForm$.next(false);
          this.snackBar.open('Ваш аккаунт успешно создан', 'Отлично!');
        }),
        catchError((error) => {
          this.isLoadingForm$.next(false);
          this.snackBar.open('Ошибка! Что-то пошло не так, попробуйте еще раз или свяжитесь с нами', 'Ок');
          throwError(() => new Error(error));
          return of(false);
        })
      ).subscribe()
    );
  }

  public onPasswordInput() {
    if (this.form.hasError('passwordMismatch'))
      this.confirmPassword?.setErrors([{ 'passwordMismatch': true }]);
    else
      this.confirmPassword?.setErrors(null);
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: any): ValidationErrors | null => {
  return formGroup.get('password').value === formGroup.get('confirmPassword').value ?
    null : { 'passwordMismatch': true };
};
