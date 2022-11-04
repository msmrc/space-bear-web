import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';
import { tap } from 'rxjs';

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public activeTab: string = 'general'; // general, additional, history, created

  public currentFullUser!: UserProfileInterface;
  public isNoFullProfile: boolean = true;

  public isUserLoading: boolean = true;

  constructor(
    private appStore: AppStore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Мой профиль')

    this.appStore.user$.pipe(
      tap((user) => {
        const fullProfile = user?.fullUser;
        if (fullProfile) {
          this.currentFullUser = fullProfile;
          this.isNoFullProfile = false;
        }
        this.isUserLoading = false;
      })
    ).subscribe();
  }

  public toEdit(): void {
    this.router.navigate(['/innovator/profile/fill']);
  }
}
