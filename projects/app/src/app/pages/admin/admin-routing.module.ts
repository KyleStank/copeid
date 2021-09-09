import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import {
  AdminFiltersComponent,
  AdminFiltersModule
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
    loadChildren: () => import('./pages/admin-definitions/admin-definitions.module').then(m => m.AdminDefinitionsModule)
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
    loadChildren: () => import('./pages/admin-genuses/admin-genuses.module').then(m => m.AdminGenusesModule)
  },
  {
    path: 'photographs',
    loadChildren: () => import('./pages/admin-photographs/admin-photographs.module').then(m => m.AdminPhotographsModule)
  },
  {
    path: 'references',
    loadChildren: () => import('./pages/admin-references/admin-references.module').then(m => m.AdminReferencesModule)
  },
  {
    path: 'specimens',
    loadChildren: () => import('./pages/admin-specimens/admin-specimens.module').then(m => m.AdminSpecimensModule)
  },
];

const importedModules = [
  AdminFiltersModule
];

@NgModule({
  imports: [
    ...importedModules,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
