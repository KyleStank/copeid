import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminContributorEditComponent } from './admin-contributor-edit/admin-contributor-edit.component';
import { AdminContributorsComponent } from './admin-contributors.component';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminContributorsComponent
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
        component: AdminContributorEditComponent
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
        component: AdminContributorEditComponent
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
