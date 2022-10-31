import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProjectsForMeComponent } from './projects-for-me/projects-for-me.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';
import { CommonModule } from '@angular/common';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { ProjectCardModule } from './project-card/project-card.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    ProjectCardModule,
    ProjectDetailsModule,
  ],
  exports: [],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ProjectsForMeComponent,
  ],
  providers: [],
})
export class ProjectsModule { }
