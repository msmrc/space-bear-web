import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(private appStore: AppStore) { }

  ngOnInit() {
    this.appStore.setPageTitle('Лента Проектов');
  }
}
