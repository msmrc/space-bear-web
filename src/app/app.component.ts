import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AppStore } from './store/app.store';
import { PersistenceService } from './tools/persistence.service';
import { SystemUserService } from './tools/system-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private appStore: AppStore,
    private systemUserService: SystemUserService,
    private persistenceService: PersistenceService,
  ) {

  }

  ngOnInit(): void {
    this._checkAuth();
    this.appStore.isExit$.pipe(
      tap((isExit) => {
        if (isExit) {
          this.systemUserService.logout();
          this.appStore.setIsExit(false);
        }
      })
    ).subscribe();
  }

  private _checkAuth(): void {
    const currentUser = this.persistenceService.get('user');
    if (currentUser) this.appStore.setUser(currentUser);
  }

}
