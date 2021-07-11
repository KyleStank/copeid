import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@app/features';
import { AdminPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Dashboard'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
