import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminSpecimensEditComponent } from './admin-specimens-edit';
import { AdminSpecimensManageComponent } from './admin-specimens-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminSpecimensManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Specimens'
        }
      } as ILayoutConfig
    },
  },
  {
    path: 'edit',
    component: AdminEditContainerComponent,
    children: [
      {
        path: ':id',
        component: AdminSpecimensEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Specimen'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'create',
    component: AdminEditContainerComponent,
    children: [
      {
        path: '',
        component: AdminSpecimensEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Specimen'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSpecimensRoutingModule {}
