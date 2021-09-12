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
    children: [
      {
        path: '',
        component: AdminManageContainerComponent,
        children: [
          {
            path: '',
            component: AdminFilterModelsManageComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Manage Filter Models'
                }
              } as ILayoutConfig
            }
          }
        ]
      },
      {
        path: 'edit',
        component: AdminEditContainerComponent,
        children: [
          {
            path: '',
            component: AdminFilterModelsEditComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Edit Filter Model'
                }
              } as ILayoutConfig
            }
          },
          {
            path: ':filterModelId',
            component: AdminFilterModelsEditComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Create Filter Model'
                }
              } as ILayoutConfig
            }
          }
        ]
      }
    ]
  },
  {
    path: ':filterModelId/properties',
    children: [
      {
        path: '',
        component: AdminManageContainerComponent,
        children: [
          {
            path: '',
            component: AdminFilterModelsManagePropertiesComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Manage Filter Model Properties'
                }
              } as ILayoutConfig
            }
          }
        ]
      },
      {
        path: 'edit',
        component: AdminEditContainerComponent,
        children: [
          {
            path: '',
            component: AdminFilterModelsEditPropertiesComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Create Filter Model Properties'
                }
              } as ILayoutConfig
            }
          },
          {
            path: ':filterModelPropertyId',
            component: AdminFilterModelsEditPropertiesComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Edit Filter Model Property'
                }
              } as ILayoutConfig
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFilterModelsRoutingModule {}
