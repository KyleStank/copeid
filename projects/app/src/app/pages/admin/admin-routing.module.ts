import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import {
  AdminDefinitionsPageComponent,
  AdminFilterModelPropertiesPageComponent,
  AdminFilterPageComponent,
  AdminGenusesPageComponent,
  AdminPhotographsPageComponent,
  AdminReferencesPageComponent,
  AdminSpecimensPageComponent
} from './components';
import {
  AdminContributorsComponent,
  AdminContributorsModule,
  AdminHomeComponent,
  AdminHomeModule
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    data: {
      layout: {
        config: {
          pageName: 'Home'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'contributors',
    component: AdminContributorsComponent,
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

const importedModules = [
  AdminHomeModule,
  AdminContributorsModule
];

@NgModule({
  imports: [
    ...importedModules,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
