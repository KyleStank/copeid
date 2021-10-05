import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReferencesPageComponent } from './references.component';

const routes: Routes = [
  {
    path: '',
    component: ReferencesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferencesRoutingModule {}
