import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsForMeComponent } from './projects-for-me/projects-for-me.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [{
  path: '',
  component: ProjectsComponent,
  children: [
    {
      path: 'all',
      component: ProjectListComponent
    },
    {
      path: 'for-me',
      component: ProjectsForMeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
