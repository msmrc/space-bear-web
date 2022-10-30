import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'projects-for-me',
  templateUrl: 'projects-for-me.component.html',
  styleUrls: ['./projects-for-me.component.scss']
})
export class ProjectsForMeComponent implements OnInit {

  public projectsForMe$ = new BehaviorSubject<any[]>([]);

  constructor(
    private appStore: AppStore,
    private router: Router,
    // private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Проекты для меня')
  }

  public onFillProfile() {
    this.router.navigate(['/innovator/profile/fill'])
  }

  public getProjects() {
    this.projectsForMe$.next([{
      title: 'DragonsBear',
      description: 'Проект для конкурса ЛЦТ2022'
    }]);
    // this.projectService.getProjectsForMe().subscribe();
  }
}
