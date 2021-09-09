import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminDefinitionsEditComponent } from './admin-definitions-edit';
import { AdminDefinitionsManageComponent } from './admin-definitions-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminDefinitionsManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Definitions'
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
        component: AdminDefinitionsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Definition'
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
        component: AdminDefinitionsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Definition'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDefinitionsRoutingModule {}
