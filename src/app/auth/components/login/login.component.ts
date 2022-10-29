import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, of, Subscription, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public hidePassword = true;
  public form!: FormGroup;
  public isLoadingForm$ = new BehaviorSubject<boolean>(false);

  private subscribe$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscribe$.unsubscribe();
  }

  public login(): void {
    this.isLoadingForm$.next(true);
    const request: any = {
      ...this.form.value,
    };

    this.subscribe$.add(
      this.authService.login(request).pipe(
        tap(() => {
          this.isLoadingForm$.next(false);
          this.snackBar.open('Вход успешно выполнен', 'Отлично', { duration: 3000 });
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

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
