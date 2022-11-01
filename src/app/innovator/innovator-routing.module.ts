import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnovatorComponent } from './innovator.component';

const routes: Routes = [{
  path: '',
  component: InnovatorComponent,
  children: [
    { path: '', redirectTo: 'projects/for-me', pathMatch: 'full' },
    {
      path: 'projects',
      loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
      path: 'my-projects',
      loadChildren: () => import('./modules/my-projects/my-projects.module').then(m => m.MyProjectsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovatorRoutingModule { }
