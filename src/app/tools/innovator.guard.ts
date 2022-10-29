import { Observable, of, switchMap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';
import { SystemUserService } from './system-user.service';
import { UserInterface } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class InnovatorGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router, private systemUser: SystemUserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.appStore.user$.pipe(
      switchMap((user: UserInterface | null) => {
        if (user && (user.role === 'user')) {
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
