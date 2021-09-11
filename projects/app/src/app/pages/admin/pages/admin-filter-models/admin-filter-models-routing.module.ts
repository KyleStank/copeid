import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminFilterModelsEditComponent } from './admin-filter-models-edit';
import { AdminFilterModelsEditPropertiesComponent } from './admin-filter-models-edit-properties';
import { AdminFilterModelsManageComponent } from './admin-filter-models-manage';
import { AdminFilterModelsManagePropertiesComponent } from './admin-filter-models-manage-properties';

const routes: Routes = [
  {
    path: '',
    component: AdminManageContainerComponent,
    children: [
      {
        path: '',
        component: AdminFilterModelsManageComponent
      },
      {
        path: ':id/properties',
        component: AdminFilterModelsManagePropertiesComponent,
        data: {
          layout: {
            config: {
              pageName: 'Manage Filter Model Properties'
            }
          } as ILayoutConfig
        }
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Manage Filter Models'
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
        component: AdminFilterModelsEditComponent
      },
      {
        path: ':id/properties',
        component: AdminFilterModelsEditPropertiesComponent,
        data: {
          layout: {
            config: {
              pageName: 'Edit Filter Model Properties'
            }
          } as ILayoutConfig
        }
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Edit Filter Model'
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
        component: AdminFilterModelsEditComponent
      }
    ],
    data: {
      layout: {
        config: {
          pageName: 'Create Filter Model'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFilterModelsRoutingModule {}
