import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public activeTab: string = 'general'; // general, additional, history, created

  constructor(
    private appStore: AppStore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Мой профиль')
  }

  public toEdit(): void {
    this.router.navigate(['/innovator/profile/fill']);
  }
}
