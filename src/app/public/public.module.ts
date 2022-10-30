import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
// Material
import { MaterialModule } from '../shared/modules/material.module';
import { PublicHeaderModule } from '../shared/modules/public-header/public-header.module';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
  ],
  imports: [
    PublicRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MaterialModule,
    PublicHeaderModule
  ],
  providers: []
})
export class PublicModule { }
