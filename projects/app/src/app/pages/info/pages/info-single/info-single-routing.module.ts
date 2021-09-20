import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InfoSinglePageComponent } from './info-single.component';

const routes: Routes = [
  {
    path: '',
    component: InfoSinglePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoSingleRoutingModule {}
