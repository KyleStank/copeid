import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminGenusesEditComponent } from './admin-genuses-edit';
import { AdminGenusesManageComponent } from './admin-genuses-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminGenusesManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Genuses'
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
        component: AdminGenusesEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Genus'
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
        component: AdminGenusesEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Genus'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGenusesRoutingModule {}
