import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';

import { PublicHeaderComponent } from './public-header.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [PublicHeaderComponent],
  declarations: [PublicHeaderComponent],
  providers: [],
})
export class PublicHeaderModule { }
