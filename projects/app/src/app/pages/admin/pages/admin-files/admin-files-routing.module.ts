import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminFilesEditComponent } from './admin-files-edit';
import { AdminFilesManageComponent } from './admin-files-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminFilesManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Files'
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
        component: AdminFilesEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit File'
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
        component: AdminFilesEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create File'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFilesEditRoutingModule {}
