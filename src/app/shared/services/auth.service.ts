import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistenceService } from 'src/app/tools/persistence.service';
import { AppStore } from 'src/app/store/app.store';
import { Router } from '@angular/router';
import { UserFromAPIInterface, UserInterface } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private persistenceService: PersistenceService,
    private appStore: AppStore,
    private router: Router
  ) { }

  login(data: any): Observable<UserFromAPIInterface> {
    return this.httpClient.post<UserFromAPIInterface>(`${environment.apiUrl}auth/login`, data).pipe(
      tap((user: UserFromAPIInterface) => {
        const storeUser: UserInterface = {
          accessToken: user.access_token,
          email: user.email,
          id: user._id,
          role: user.role
        }
        this.persistenceService.set('user', storeUser);
        this.appStore.setUser(storeUser);

        let url = '';
        if (user.role === 'user') {
          url = '/innovator';
        }
        if (user.role === 'admin') {
          url = '/admin';
        }

        this.router.navigate([url]);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}auth/create`, data).pipe(
      tap((user: any) => {
        const storeUser: UserInterface = {
          accessToken: user.access_token,
          email: user.email,
          id: user._id,
          role: user.role
        }
        this.persistenceService.set('user', storeUser);
        this.appStore.setUser(storeUser);

        let url = '';
        if (user.role === 'user') {
          url = '/innovator';
        }
        if (user.role === 'admin') {
          url = '/admin';
        }

        this.router.navigate([url]);
      })
    );
  }
}
