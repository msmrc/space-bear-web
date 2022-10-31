import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-project-card',
  templateUrl: 'project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {

  public isOpen: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  public switchDetails(): void {
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
  }

  public openDetails(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
