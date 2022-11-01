import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'projects-list',
  templateUrl: 'projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Мои проекты');
    this.appStore.setPageAction({
      actionName: 'Добавить проект +',
      actionCallback: this.createProject
    });
  }

  ngOnDestroy(): void {
    this.appStore.setPageAction(null);
  }

  public createProject = () => {
    this.router.navigate(['/innovator/my-projects/create'])
  }
}
