import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import {
  AdminContributorsPageComponent,
  AdminDefinitionsPageComponent,
  AdminFilterModelPropertiesPageComponent,
  AdminFilterPageComponent,
  AdminGenusesPageComponent,
  AdminPageComponent,
  AdminPhotographsPageComponent,
  AdminReferencesPageComponent,
  AdminSpecimensPageComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Dashboard'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'contributors',
    component: AdminContributorsPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Contributors'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'definitions',
    component: AdminDefinitionsPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Definitions'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'genuses',
    component: AdminGenusesPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Genuses'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'photographs',
    component: AdminPhotographsPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Photographs'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'specimens',
    component: AdminSpecimensPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Specimens'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'references',
    component: AdminReferencesPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'References'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'filter',
    children: [
      {
        path: '',
        component: AdminFilterPageComponent,
        data: {
          layout: {
            config: {
              pageName: 'Filter'
            }
          } as ILayoutConfig
        },
      },
      {
        path: 'models/:id/properties',
        component: AdminFilterModelPropertiesPageComponent,
        data: {
          layout: {
            config: {
              pageName: 'Filter Model Properties'
            }
          } as ILayoutConfig
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
