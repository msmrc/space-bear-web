import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'projects-list',
  templateUrl: 'projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent implements OnInit, OnDestroy {

  public myProjects: ProjectInterface[] = [];

  constructor(
    private appStore: AppStore,
    private router: Router,
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Мои проекты');
    this.appStore.setPageAction({
      actionName: 'Добавить проект +',
      actionCallback: this.createProject
    });


    this.appStore.user$.pipe(
      switchMap((user) => user?.fullUser?._id ? this.projectsService.getProjectsByMemberId(user?.fullUser?._id) : of()),
      tap((projects) => {
        if (projects) {
          this.myProjects = projects;
          this.cdr.detectChanges();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.appStore.setPageAction(null);
  }

  public viewProject(): void {

  }

  public editProject(): void {

  }

  // callback
  public createProject = () => {
    this.router.navigate(['/innovator/my-projects/create'])
  }
}
