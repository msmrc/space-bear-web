import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material.module';
import { LoginComponent } from './components/login/login.component';
import { PublicHeaderModule } from '../shared/modules/public-header/public-header.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PublicHeaderModule,
  ],
  providers: [],
})
export class AuthModule { }
