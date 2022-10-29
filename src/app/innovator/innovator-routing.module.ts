import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnovatorComponent } from './innovator.component';

const routes: Routes = [{
  path: '',
  component: InnovatorComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovatorRoutingModule { }
