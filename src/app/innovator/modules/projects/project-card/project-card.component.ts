import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberInterface, ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-project-card',
  templateUrl: 'project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {

  @Input()
  project!: ProjectInterface;

  public isOpen: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private projectService: ProjectsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  public switchDetails(): void {
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
  }

  public getTooltip(member: MemberInterface): string {
    const userProfile = member.fullProfileId as UserProfileInterface;
    return `${userProfile.firstName} ${userProfile.secondName} ${member.category}`
  }

  public getProjectRate() {
    const rates = this.project.rate;
    if (rates && rates.length > 0) {
      return rates.map(x => x.count).reduce((x, y) => x + y);
    } else {
      return 0;
    }
  }

  public openDetails(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '800px',
      data: {
        id: this.project._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
