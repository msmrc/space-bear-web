import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../store/app.store';
import { PersistenceService } from './persistence.service';

@Injectable()
export class SystemUserService {
  constructor(
    private persistenceService: PersistenceService,
    private appStore: AppStore,
    private router: Router) {
  }

  getToken(): string {
    return this.persistenceService.get('user')?.accessToken;
  }

  logout() {
    this.appStore.setUser(null);
    localStorage.clear();
    // TODO: Need to find a BUG with logout
    this.router.navigate(['/auth/login']); //.then(() => window.location.reload());
  }
}
