import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'view-user',
  templateUrl: 'view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public activeTab: string = 'general'; // general, additional, history, created

  constructor(
    private appStore: AppStore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Просмотр профиль')
  }

  public invite(): void {
    // модальное окно с приглашением
  }
}
