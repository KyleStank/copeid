import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminContributorEditComponent } from './admin-contributor-edit/admin-contributor-edit.component';
import { AdminContributorsComponent } from './admin-contributors.component';

const routes: Routes = [
  {
    path: '',
    component: AdminContributorsComponent,
    data: {
      layout: {
        config: {
          pageName: 'Contributors'
        }
      } as ILayoutConfig
    },
  },
  {
    path: ':id/edit',
    component: AdminContributorEditComponent,
    data: {
      layout: {
        config: {
          pageName: 'Edit Contributor'
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
