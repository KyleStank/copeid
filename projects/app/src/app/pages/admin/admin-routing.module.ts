import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@app/features';
import { AdminGenusesPageComponent, AdminPageComponent } from './components';

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
  },
  {
    path: 'genuses',
    component: AdminGenusesPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Genuses'
        }
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
