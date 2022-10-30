import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProfileFillComponent } from './profile-fill/profile-fill.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';


@NgModule({
  imports: [
    ProfileRoutingModule,
    MaterialModule,
  ],
  exports: [],
  declarations: [
    ProfileViewComponent,
    ProfileFillComponent
  ],
  providers: [],
})
export class ProfileModule { }
