import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminDocumentsEditComponent } from './admin-documents-edit';
import { AdminDocumentsManageComponent } from './admin-documents-manage';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminDocumentsManageComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Documents'
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
        component: AdminDocumentsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Document'
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
        component: AdminDocumentsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Document'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDocumentsRoutingModule {}
