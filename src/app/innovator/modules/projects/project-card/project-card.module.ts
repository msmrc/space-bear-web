import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProjectDetailsModule } from '../project-details/project-details.module';
import { ProjectCardComponent } from './project-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProjectDetailsModule
  ],
  exports: [
    ProjectCardComponent
  ],
  declarations: [
    ProjectCardComponent
  ],
  providers: [],
})
export class ProjectCardModule { }
