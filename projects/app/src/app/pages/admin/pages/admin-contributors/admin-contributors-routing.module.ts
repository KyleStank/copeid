import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminContributorsEditComponent } from './admin-contributors-edit/admin-contributors-edit.component';
import { AdminContributorsManageComponent } from './admin-contributors-manage/admin-contributors-manage.component';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminContributorsManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Contributors'
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
        component: AdminContributorsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Contributor'
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
        component: AdminContributorsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Contributor'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminContributorsRoutingModule {}
