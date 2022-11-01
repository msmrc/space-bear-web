import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MyProjectsComponent } from './my-projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyProjectsComponent,
    children: [
      {
        path: 'list',
        component: ProjectsListComponent
      },
      {
        path: 'edit/:id',
        component: EditProjectComponent
      },
      {
        path: 'create',
        component: CreateProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProjectsRoutingModule { }
