import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminReferencesEditComponent } from './admin-references-edit';
import { AdminReferencesManageComponent } from './admin-references-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminReferencesManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage References'
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
        component: AdminReferencesEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Reference'
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
        component: AdminReferencesEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Reference'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReferencesRoutingModule {}
