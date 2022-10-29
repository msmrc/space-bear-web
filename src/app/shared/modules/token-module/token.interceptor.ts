/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Observable, throwError, first, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/store/app.store';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private appStore: AppStore, private router: Router,) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.appStore.user$.pipe(
      first(),
      switchMap((user: any) => {
        if (!!user?.accessToken) {
          return next.handle(req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.accessToken}`
            }
          })).pipe(
            catchError((error: HttpErrorResponse) => this.handleAuthError(error))
          );
        } else {
          return next.handle(req);
        }
      })
    );
  }

  private handleAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.appStore.setIsExit(true);
      this.router.navigate(['/login'],
        {
          queryParams: {
            sessionFailed: true,
          },
        });
    }

    return throwError(error);
  }
}
