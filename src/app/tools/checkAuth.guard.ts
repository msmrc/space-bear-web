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
export class CheckAuthGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.appStore.user$.pipe(
      switchMap((user: UserInterface | null) => {
        if (user && user.role) {
          if (user.role === 'user') {
            this.router.navigate(['/innovator']);
            return of(false);
          }
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
            return of(false);
          }

          return of(false);
        } else {
          return of(true);
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
