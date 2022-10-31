import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';


@Component({
  selector: 'profile-fill',
  templateUrl: 'profile-fill.component.html',
  styleUrls: ['./profile-fill.component.scss']
})
export class ProfileFillComponent implements OnInit {
  constructor(private appStore: AppStore) {
  }

  ngOnInit() {
    this.appStore.setPageTitle('Заполнение профиля')
  }

}
