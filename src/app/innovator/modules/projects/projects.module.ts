import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProjectsForMeComponent } from './projects-for-me/projects-for-me.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';
import { CommonModule } from '@angular/common';
import { BearModule } from 'src/app/shared/modules/bear-module/bear.module';
import { ProjectCardModule } from 'src/app/shared/modules/project-card/project-card.module';
import { ProjectDetailsModule } from 'src/app/shared/modules/project-details/project-details.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    ProjectCardModule,
    ProjectDetailsModule,
    BearModule,
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
