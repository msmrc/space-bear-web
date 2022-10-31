import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProjectDetailsComponent } from './project-details.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProjectDetailsComponent
  ],
  declarations: [
    ProjectDetailsComponent
  ],
  providers: [],
})
export class ProjectDetailsModule { }
