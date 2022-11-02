import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tap, BehaviorSubject, timer } from 'rxjs';
import { AppStore } from './store/app.store';
import { PersistenceService } from './tools/persistence.service';
import { SystemUserService } from './tools/system-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {

  public isPageLoading = true;

  constructor(
    private appStore: AppStore,
    private systemUserService: SystemUserService,
    private persistenceService: PersistenceService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit(): void {
    timer(3000).pipe(tap(() => {
      this.isPageLoading = false;
      this.cdr.detectChanges();
    })).subscribe();
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

  public isMobileDevice(): boolean {
    return window.matchMedia('(max-width: 1200px)').matches;
  }

  private _checkAuth(): void {
    const currentUser = this.persistenceService.get('user');
    if (currentUser) this.appStore.setUser(currentUser);
  }

}
