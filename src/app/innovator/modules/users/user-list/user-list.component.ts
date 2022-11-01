import { tap } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  public userList: UserProfileInterface[] = [];

  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Специалисты');

    this.userService.getAllUsers().pipe(
      tap((userList) => {
        this.userList = userList;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
