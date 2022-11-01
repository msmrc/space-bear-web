import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
  ],
  exports: [],
  declarations: [
    UsersComponent,
    UserListComponent
  ],
  providers: [],
})
export class UsersModule { }
