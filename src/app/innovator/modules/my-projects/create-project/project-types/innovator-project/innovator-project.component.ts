import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'app-innovator-project',
  templateUrl: 'innovator-project.component.html',
  styleUrls: ['./innovator-project.component.scss']
})
export class InnovatorProjectComponent implements OnInit {

  public currentTab: number = 1;

  constructor(private appStore: AppStore) { }

  ngOnInit() {
    this.appStore.setPageSubtitle('Заполните все необходимые данные');
  }
}
