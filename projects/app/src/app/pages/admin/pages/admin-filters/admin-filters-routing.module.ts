import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { AdminEditContainerComponent, AdminManageContainerComponent } from '../../components';
import { AdminFiltersSectionsEditComponent } from './admin-filter-sections-edit';
import { AdminFiltersSectionsManageComponent } from './admin-filter-sections-manage';
import { AdminFiltersSectionsPartsEditComponent } from './admin-filter-sections-parts-edit';
import { AdminFiltersSectionsPartsManageComponent } from './admin-filter-sections-parts-manage';
import { AdminFiltersSectionsPartsOptionsEditComponent } from './admin-filter-sections-parts-options-edit';
import { AdminFiltersSectionsPartsOptionsManageComponent } from './admin-filter-sections-parts-options-manage';
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
        path: ':filterSectionId/parts',
        children: [
          {
            path: '',
            component: AdminManageContainerComponent,
            children: [
              {
                path: '',
                component: AdminFiltersSectionsPartsManageComponent,
                data: {
                  layout: {
                    config: {
                      pageName: 'Manage Filter Section Parts'
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
                component: AdminFiltersSectionsPartsEditComponent,
                data: {
                  layout: {
                    config: {
                      pageName: 'Create Filter Section Part'
                    }
                  } as ILayoutConfig
                }
              },
              {
                path: ':filterSectionPartId',
                component: AdminFiltersSectionsPartsEditComponent,
                data: {
                  layout: {
                    config: {
                      pageName: 'Edit Filter Section Part'
                    }
                  } as ILayoutConfig
                }
              }
            ]
          },
          {
            path: ':filterSectionPartId/options',
            children: [
              {
                path: '',
                component: AdminManageContainerComponent,
                children: [
                  {
                    path: '',
                    component: AdminFiltersSectionsPartsOptionsManageComponent,
                    data: {
                      layout: {
                        config: {
                          pageName: 'Manage Filter Section Part Options'
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
                    component: AdminFiltersSectionsPartsOptionsEditComponent,
                    data: {
                      layout: {
                        config: {
                          pageName: 'Create Filter Section Part Option'
                        }
                      } as ILayoutConfig
                    }
                  },
                  {
                    path: ':filterSectionPartOptionId',
                    component: AdminFiltersSectionsPartsOptionsEditComponent,
                    data: {
                      layout: {
                        config: {
                          pageName: 'Edit Filter Section Part Option'
                        }
                      } as ILayoutConfig
                    }
                  }
                ]
              },
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
