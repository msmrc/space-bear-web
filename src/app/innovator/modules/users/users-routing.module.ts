import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';


const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: '',
      component: UserListComponent
    },
    {
      path: 'view/:id',
      component: ViewUserComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
