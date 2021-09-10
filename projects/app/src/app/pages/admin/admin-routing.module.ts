import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/admin-filters/admin-filters.module').then(m => m.AdminFiltersModule)
  },
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
