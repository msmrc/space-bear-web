import { NgModule } from '@angular/core';
import { InnovatorRoutingModule } from './innovator-routing.module';
import { InnovatorComponent } from './innovator.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    InnovatorComponent,
    HeaderComponent,
  ],
  imports: [
    InnovatorRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
})
export class InnovatorModule { }
