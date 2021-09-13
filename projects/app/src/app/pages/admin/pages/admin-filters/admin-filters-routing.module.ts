import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminFiltersSectionsEditComponent } from './admin-filter-sections-edit';
import { AdminFiltersSectionsManageComponent } from './admin-filter-sections-manage';
import { AdminFiltersSectionsOptionsEditComponent } from './admin-filter-sections-options-edit';
import { AdminFiltersSectionsOptionsManageComponent } from './admin-filter-sections-options-manage';
import { AdminFiltersEditComponent } from './admin-filters-edit';
import { AdminFiltersManageComponent } from './admin-filters-manage';

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
            component: AdminFiltersManageComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Manage Filters'
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
            component: AdminFiltersEditComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Edit Filter'
                }
              } as ILayoutConfig
            }
          },
          {
            path: ':filterId',
            component: AdminFiltersEditComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Create Filter'
                }
              } as ILayoutConfig
            }
          }
        ]
      }
    ]
  },
  {
    path: ':filterId/sections',
    children: [
      {
        path: '',
        component: AdminManageContainerComponent,
        children: [
          {
            path: '',
            component: AdminFiltersSectionsManageComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Manage Filter Sections'
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
            component: AdminFiltersSectionsEditComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Create Filter Section'
                }
              } as ILayoutConfig
            }
          },
          {
            path: ':filterSectionId',
            component: AdminFiltersSectionsEditComponent,
            data: {
              layout: {
                config: {
                  pageName: 'Edit Filter Section'
                }
              } as ILayoutConfig
            }
          }
        ]
      },
      {
        path: ':filterSectionId/options',
        children: [
          {
            path: '',
            component: AdminManageContainerComponent,
            children: [
              {
                path: '',
                component: AdminFiltersSectionsOptionsManageComponent,
                data: {
                  layout: {
                    config: {
                      pageName: 'Manage Filter Section Options'
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
                component: AdminFiltersSectionsOptionsEditComponent,
                data: {
                  layout: {
                    config: {
                      pageName: 'Create Filter Section Option'
                    }
                  } as ILayoutConfig
                }
              },
              {
                path: ':filterSectionOptionId',
                component: AdminFiltersSectionsOptionsEditComponent,
                data: {
                  layout: {
                    config: {
                      pageName: 'Edit Filter Section Option'
                    }
                  } as ILayoutConfig
                }
              }
            ]
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
export class AdminFiltersRoutingModule {}
