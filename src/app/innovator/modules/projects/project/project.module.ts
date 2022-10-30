import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [
    ProjectComponent
  ],
  declarations: [
    ProjectComponent
  ],
  providers: [],
})
export class ProjectModule { }
