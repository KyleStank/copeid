import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@app/features';
import { DashboardEditPageComponent, DashboardPageComponent } from './components';

const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  {
    path: 'edit',
    component: DashboardEditPageComponent,
    data: {
      header: {
        config: {
          text: 'Dashboard Edit'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
