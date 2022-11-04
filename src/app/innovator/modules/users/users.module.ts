import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    UsersComponent,
    ViewUserComponent,
    UserCardComponent,
    UserListComponent
  ],
  providers: [],
})
export class UsersModule { }
