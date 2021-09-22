import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InfoPageComponent } from './info.component';

const routes: Routes = [
  {
    path: '',
    component: InfoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {}
