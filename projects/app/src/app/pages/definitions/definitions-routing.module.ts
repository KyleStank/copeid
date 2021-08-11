import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefinitionsPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: DefinitionsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinitionsRoutingModule {}
