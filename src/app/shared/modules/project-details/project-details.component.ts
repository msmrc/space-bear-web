import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { MemberInterface, ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'app-project-details',
  templateUrl: 'project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  // комментарий
  public comment = new FormControl('');

  // загрузки
  public isProjectLoading: boolean = true;
  public isRequestLoading: boolean = false;
  public isCommentLoading: boolean = false;

  public fullProject!: ProjectInterface;
  public currentProfileId!: string;

  constructor(
    private appStore: AppStore,
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.projectService.getProjectById(this.data.id).pipe(
      tap((project) => {
        this.fullProject = project;
        this.isProjectLoading = false;
      })
    ).subscribe();

    this.appStore.user$.pipe(
      tap((user) => {
        const fullUser = user?.fullUser;
        this.currentProfileId = fullUser?._id!;
        //   this.cdr.detectChanges();
      })
    ).subscribe();
  }

  public rateUp() {
    this.projectService.rate({ projectId: this.fullProject._id!, count: 10, fullProfileId: this.currentProfileId }).pipe(
      tap((response) => this.fullProject = response)
    ).subscribe();
  }

  public rateDown() {
    this.projectService.rate({ projectId: this.fullProject._id!, count: -10, fullProfileId: this.currentProfileId }).pipe(
      tap((response) => this.fullProject = response)
    ).subscribe();
  }

  public getMember(member: MemberInterface): UserProfileInterface {
    return member.fullProfileId as UserProfileInterface;
  }

  public sendComment() {
    this.projectService.comment({
      projectId: this.fullProject._id!,
      comment: this.comment.value,
      fullProfileId: this.currentProfileId
    }).pipe(
      tap((response) => this.fullProject = response)
    ).subscribe();
  }

  public checkDislike(): boolean {
    const rate = this.fullProject.rate
    if (rate && rate.length > 0) {
      const existAction = rate?.filter(x => x.fullProfileId._id === this.currentProfileId)[0];
      if (existAction && existAction.count < 0) {
        return true;
      }
    }

    return false;
  }

  public checkLike(): boolean {
    const rate = this.fullProject.rate
    if (rate && rate.length > 0) {
      const existAction = rate?.filter(x => x.fullProfileId._id === this.currentProfileId)[0];
      if (existAction && existAction.count > 0) {
        return true;
      }
    }

    return false;
  }

  public getProjectRate() {
    const rates = this.fullProject.rate;
    if (rates && rates.length > 0) {
      return rates.map(x => x.count).reduce((x, y) => x + y);
    } else {
      return 0;
    }
  }
}
