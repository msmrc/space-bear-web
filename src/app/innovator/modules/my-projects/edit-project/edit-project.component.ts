import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'edit-project',
  templateUrl: 'edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  constructor(private appStore: AppStore) { }

  ngOnInit() {
    this.appStore.setPageTitle('Редактирование проекта');
  }
}
