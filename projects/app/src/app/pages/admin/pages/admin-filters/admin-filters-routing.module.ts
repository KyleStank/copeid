import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminFiltersEditComponent } from './admin-filters-edit';
import { AdminFiltersManageComponent } from './admin-filters-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminFiltersManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Filters'
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
        component: AdminFiltersEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Filter'
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
        component: AdminFiltersEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Filter'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFiltersRoutingModule {}
