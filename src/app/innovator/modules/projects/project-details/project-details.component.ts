import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: 'project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  public fullProject!: ProjectInterface;

  constructor(
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.projectService.getProjectById(this.data.id).pipe(
      tap((project) => this.fullProject = project)
    ).subscribe();
  }

}
