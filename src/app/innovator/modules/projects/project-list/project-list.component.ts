import { tap } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  public isProjectsLoading: boolean = true;
  public projects: ProjectInterface[] = []

  constructor(
    private appStore: AppStore,
    private projectService: ProjectsService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Лента Идей');

    this.projectService.getAllProjects().pipe(
      tap((projects) => {
        this.projects = projects;
        this.isProjectsLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
