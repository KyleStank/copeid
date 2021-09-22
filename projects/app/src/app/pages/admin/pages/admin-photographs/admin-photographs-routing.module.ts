import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminPhotographsEditComponent } from './admin-photographs-edit';
import { AdminPhotographsManageComponent } from './admin-photographs-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminPhotographsManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Photographs'
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
        component: AdminPhotographsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Photograph'
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
        component: AdminPhotographsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Photograph'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPhotographsRoutingModule {}
