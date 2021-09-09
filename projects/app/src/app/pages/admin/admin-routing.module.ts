import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import {
  AdminDefinitionsComponent,
  AdminDefinitionsModule,
  AdminFiltersComponent,
  AdminFiltersModule,
  AdminGenusesComponent,
  AdminGenusesModule,
  AdminPhotographsComponent,
  AdminPhotographsModule,
  AdminReferencesComponent,
  AdminReferencesModule,
  AdminSpecimensComponent,
  AdminSpecimensModule
} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contributors'
  },
  {
    path: 'contributors',
    loadChildren: () => import('./pages/admin-contributors/admin-contributors.module').then(m => m.AdminContributorsModule)
  },
  {
    path: 'definitions',
    component: AdminDefinitionsComponent,
    data: {
      layout: {
        config: {
          pageName: 'Definitions'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'filters',
    component: AdminFiltersComponent,
    data: {
      layout: {
        config: {
          pageName: 'Filters'
        }
      } as ILayoutConfig
    }
  },
  // TODO: Implement all old Filter routes
  // {
  //   path: 'filter',
  //   children: [
  //     {
  //       path: '',
  //       component: AdminFilterPageComponent,
  //       data: {
  //         layout: {
  //           config: {
  //             pageName: 'Filter'
  //           }
  //         } as ILayoutConfig
  //       },
  //     },
  //     {
  //       path: 'models/:id/properties',
  //       component: AdminFilterModelPropertiesPageComponent,
  //       data: {
  //         layout: {
  //           config: {
  //             pageName: 'Filter Model Properties'
  //           }
  //         } as ILayoutConfig
  //       }
  //     }
  //   ]
  // },
  {
    path: 'genuses',
    component: AdminGenusesComponent,
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
    component: AdminPhotographsComponent,
    data: {
      layout: {
        config: {
          pageName: 'Photographs'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'references',
    component: AdminReferencesComponent,
    data: {
      layout: {
        config: {
          pageName: 'References'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'specimens',
    component: AdminSpecimensComponent,
    data: {
      layout: {
        config: {
          pageName: 'Specimens'
        }
      } as ILayoutConfig
    }
  }
];

const importedModules = [
  AdminDefinitionsModule,
  AdminFiltersModule,
  AdminGenusesModule,
  AdminPhotographsModule,
  AdminReferencesModule,
  AdminSpecimensModule
];

@NgModule({
  imports: [
    ...importedModules,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
