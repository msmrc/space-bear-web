import { switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { UserInterface } from './../../../../shared/interfaces/user.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';

@Component({
  selector: 'projects-for-me',
  templateUrl: 'projects-for-me.component.html',
  styleUrls: ['./projects-for-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsForMeComponent implements OnInit {

  public isProjectsLoading: boolean = false;

  public isFullProfileFilled: boolean = false;
  public isButtonPressed: boolean = false;
  public fullProfileId: string = '';

  public projectsForMe: ProjectInterface[] = [];

  private projectsMoreFifty: any[] = [];

  constructor(
    private appStore: AppStore,
    private router: Router,
    private projectService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Главная');
    this.appStore.user$.pipe(
      tap((user) => {
        const fullUser = user?.fullUser;
        if (fullUser) {
          this.fullProfileId = fullUser._id!;
          this.isFullProfileFilled = true;
        } else {
          this.isFullProfileFilled = false;
        }
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  public onFillProfile() {
    this.router.navigate(['/innovator/profile/fill'])
  }

  public getProjects() {
    this.isButtonPressed = true;
    this.isProjectsLoading = true;

    this.projectsMoreFifty = [];
    const projectRequests: Observable<ProjectInterface>[] = [];

    this.projectService.getProjectsForMe(this.fullProfileId).pipe(
      tap((projects) => {
        // this.projectsForMe = projects;
        for (const [key, value] of Object.entries(projects)) {
          // key = projectId
          // value.semantic = semantic to fixed & * 100
          const semantic = +(value.semantic as Number).toFixed(2) * 100;
          if (semantic > 70) {
            this.projectsMoreFifty.push({
              id: key,
              semantic: semantic
            })
          }
        }

      }),
      tap(() => {
        // подготовка к запросам на сервер
        if (this.projectsMoreFifty.length > 0) {
          this.projectsMoreFifty.forEach((x) => projectRequests.push(this.projectService.getProjectById(x.id)))
        }
      }),
      switchMap(() => projectRequests.length > 0 ? forkJoin(projectRequests) : of(false)),
      tap((projects: ProjectInterface[] | boolean) => {
        if (Array.isArray(projects)) {
          projects.forEach(project => {
            // задаем семантику
            this.projectsMoreFifty.forEach(semanticProject => {
              if (project._id === semanticProject.id) {
                project.semantic = semanticProject.semantic;
                this.projectsForMe.push(project);
              }
            })
          })
        }
        this.projectsForMe.sort((current, prev) => prev.semantic! - current.semantic!)
        console.log(this.projectsForMe);
        this.isProjectsLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  public onProjectCreate() {
    this.router.navigate(['/innovator/my-projects/create'])
  }
}
