import { switchMap } from 'rxjs/operators';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { of, tap } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { AppStore } from 'src/app/store/app.store';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  public selectedProject!: ProjectInterface;

  public userList: UserProfileInterface[] = [];

  public haveProjects: boolean = false;
  public isUserFullProfile: boolean = false;

  // загрузки
  public isProjectsLoading: boolean = true;
  public isUserListLoading: boolean = false;

  // выбор проекта
  public projectInput = new FormControl('');
  public projectsList: ProjectInterface[] = []

  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private projectService: ProjectsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Сбор команды');

    this.appStore.user$.pipe(
      switchMap((user) => {
        if (user && user.fullUser) {
          this.isUserFullProfile = true;
          return this.projectService.getProjectsByMemberId(user.fullUser._id!)
        } else {
          this.isUserFullProfile = false;
          return of()
        }
      }),
      tap((projects) => {
        if (projects.length > 0) {
          this.haveProjects = true;
          this.projectsList = projects;
        } else {
          this.haveProjects = false;
        }
        this.isProjectsLoading = false;
        this.cdr.detectChanges();
      }),
    ).subscribe();

    // this.userService.getAllUsers().pipe(
    //   tap((userList) => {
    //     this.userList = userList;
    //     this.cdr.detectChanges();
    //   })
    // ).subscribe();
  }

  public selectProject() {
    this.isUserListLoading = true
    this.projectService.getBearsForProject(this.projectInput.value).pipe(
      tap((response) => {
        console.log('resp', response);
        this.isUserListLoading = false;
      })
    ).subscribe();
  }


  public viewUser(id: string) {
    this.router.navigate([`/innovator/bears/view/${id}`]);
  }
}
