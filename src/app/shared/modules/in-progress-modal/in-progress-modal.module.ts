import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { InProgressModalComponent } from './in-progress-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    InProgressModalComponent
  ],
  declarations: [
    InProgressModalComponent
  ],
  providers: [],
})
export class InProgressModalModule { }
