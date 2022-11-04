import { switchMap } from 'rxjs/operators';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { forkJoin, Observable, of, tap } from 'rxjs';
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

  public userForMeList: UserProfileInterface[] = [];

  public haveProjects: boolean = false;
  public isUserFullProfile: boolean = false;

  // загрузки
  public isProjectsLoading: boolean = true;
  public isUserListLoading: boolean = false;

  // выбор проекта
  public projectInput = new FormControl('');
  public projectsList: ProjectInterface[] = []

  private usersMoreFifty: any[] = [];
  private currentUserId!: string;

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
          this.currentUserId = user.fullUser?._id!;
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
    this.isUserListLoading = true;


    this.usersMoreFifty = [];
    const userRequests: Observable<UserProfileInterface>[] = [];


    this.projectService.getBearsForProject(this.projectInput.value).pipe(
      tap((users) => {
        for (const [key, value] of Object.entries(users)) {
          // key = projectId
          // value.semantic = semantic to fixed & * 100
          const semantic = +(value.semantic as Number).toFixed(2) * 100;
          if (semantic >= 70 && key !== this.currentUserId) {
            this.usersMoreFifty.push({
              id: key,
              semantic: semantic
            })
          }
        }
      }),
      tap(() => {
        // подготовка к запросам на сервер
        if (this.usersMoreFifty.length > 0) {
          this.usersMoreFifty.forEach((x) => userRequests.push(this.userService.getUserProfileById(x.id)))
        }
      }),
      switchMap(() => userRequests.length > 0 ? forkJoin(userRequests) : of(false)),
      tap((users: UserProfileInterface[] | boolean) => {
        if (Array.isArray(users)) {
          users.forEach(user => {
            if (user) {
              // задаем семантику
              this.usersMoreFifty.forEach(semanticUser => {
                if (user._id === semanticUser.id) {
                  user.semantic = semanticUser.semantic;
                  this.userForMeList.push(user);
                }
              })
            }

          })
        }
        this.userForMeList.sort((current, prev) => prev.semantic! - current.semantic!)
        console.log(this.userForMeList);
        this.isUserListLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }


  public viewUser(id: string) {
    this.router.navigate([`/innovator/bears/view/${id}`]);
  }
}
