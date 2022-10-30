import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProjectsForMeComponent } from './projects-for-me/projects-for-me.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';
import { ProjectModule } from './project/project.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    ProjectModule
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
