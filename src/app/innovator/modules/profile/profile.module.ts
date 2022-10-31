import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PillbarInputModule } from 'src/app/shared/modules/pillbar-input/pillbar-input.module';
import { ProfileFillComponent } from './profile-fill/profile-fill.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MaterialModule,
    PillbarInputModule,
  ],
  exports: [],
  declarations: [
    ProfileViewComponent,
    ProfileFillComponent
  ],
  providers: [],
})
export class ProfileModule { }
