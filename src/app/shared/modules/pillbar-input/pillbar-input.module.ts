import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PillbarInputComponent } from './pillbar-input.component';
import {TagModule} from "../tag/tag.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TagModule, MatFormFieldModule, MatInputModule],
  exports: [PillbarInputComponent],
  declarations: [PillbarInputComponent],
  providers: [],
})
export class PillbarInputModule { }
