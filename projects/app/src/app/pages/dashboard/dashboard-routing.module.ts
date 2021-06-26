import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardEditPageComponent, DashboardPageComponent } from './components';

const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'edit', component: DashboardEditPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
