import { Observable, of, switchMap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AppStore } from '../store/app.store';
import { UserInterface } from '../shared/interfaces/user.interface';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.appStore.user$.pipe(
      switchMap((user: UserInterface | null) => {
        if (user && user.role === 'admin') {
          return of(true);
        } else {
          this.router.navigate(['/auth/login'], {
            queryParams: {
              accessDenied: true,
            },
          });
          return of(false);
        }
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
