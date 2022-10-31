import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagComponent} from "./tag.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TagComponent
  ],
  providers: [],
  exports: [
    TagComponent
  ]
})
export class TagModule { }
