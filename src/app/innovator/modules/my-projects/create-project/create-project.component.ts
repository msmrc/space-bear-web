import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'create-project',
  templateUrl: 'create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectComponent implements OnInit, OnDestroy {

  public step: number = 2;
  public selectedProjectType = 'innovator';

  public isNoUserProfile = false;

  constructor(
    private appStore: AppStore,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Добавление идеи');
    // this.appStore.setPageSubtitle('Выберете одно из нескольких направлений');

    this.appStore.user$.pipe(
      tap((user) => {
        const fullUser = user?.fullUser;
        if (!fullUser || !fullUser._id) {
          this.isNoUserProfile = true;
          this.cdr.detectChanges();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.appStore.setPageSubtitle('');
  }

  public toFillProfile() {
    this.router.navigate(['/innovator/profile/fill']);
  }

  public selectType(type: string) {
    this.selectedProjectType = type;
    this.step = 2;
    this.cdr.detectChanges();
  }
}
