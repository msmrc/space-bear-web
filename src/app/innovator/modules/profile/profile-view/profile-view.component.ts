import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  constructor(private appStore: AppStore) { }

  ngOnInit() {
    this.appStore.setPageTitle('Мой профиль')
  }
}
