import { UserInterface } from './../../../../shared/interfaces/user.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'projects-for-me',
  templateUrl: 'projects-for-me.component.html',
  styleUrls: ['./projects-for-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsForMeComponent implements OnInit {

  public isProjectsLoading: boolean = false;

  public isFullProfileFilled: boolean = false;
  public fullProfileId: string = '';

  public projectsForMe$ = new BehaviorSubject<any[]>([]);

  constructor(
    private appStore: AppStore,
    private router: Router,
    private projectService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Проекты для меня');
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
    // this.projectsForMe$.next([{
    //   title: 'DragonsBear',
    //   description: 'Проект для конкурса ЛЦТ2022'
    // }]);
    this.isProjectsLoading = true;
    this.projectService.getProjectsForMe(this.fullProfileId).pipe(
      tap((projects) => {
        this.projectsForMe$.next(projects);
        this.isProjectsLoading = false;
        this.cdr.detectChanges();
      }),
    ).subscribe();
  }

  public onProjectCreate() {
    this.router.navigate(['/innovator/my-projects/create'])
  }
}
