import { CreateProjectComponent } from './create-project/create-project.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { MyProjectsRoutingModule } from './my-projects-routing.module';
import { MyProjectsComponent } from './my-projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { InnovatorProjectComponent } from './create-project/project-types/innovator-project/innovator-project.component';


@NgModule({
  imports: [
    CommonModule,
    MyProjectsRoutingModule,
    MaterialModule,
  ],
  exports: [],
  declarations: [
    MyProjectsComponent,
    CreateProjectComponent,
    EditProjectComponent,
    InnovatorProjectComponent,
    ProjectsListComponent
  ],
  providers: [],
})
export class MyProjectsModule { }
