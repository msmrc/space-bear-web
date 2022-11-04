import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';
import { UserService } from 'src/app/shared/services/user.service';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { MatDialog } from '@angular/material/dialog';
import { InProgressModalComponent } from 'src/app/shared/modules/in-progress-modal/in-progress-modal.component';

@Component({
  selector: 'view-user',
  templateUrl: 'view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewUserComponent implements OnInit {

  public currentUser!: UserProfileInterface;
  public activeTab: string = 'general'; // general, additional, history, created

  // загрузка
  public isUserLoading: boolean = true;

  constructor(
    private appStore: AppStore,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Просмотр профиль')
    this.route.params.pipe(
      switchMap((params) => this.userService.getUserProfileById(params['id'])),
      tap((user) => {
        this.currentUser = user;
        this.isUserLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe()
  }

  public invite(): void {
    this.openInProgress();
    // модальное окно с приглашением
  }

  public openInProgress() {
    this.dialog.open(InProgressModalComponent);
  }
}
