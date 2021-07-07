import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderDefaultComponent, ILayoutConfig } from './features';

// TODO: Can we create a custom type that extends Routes and takes a generic type T to define the type of data?
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    data: {
      showFooter: false,

      header: {
        component: HeaderDefaultComponent,
        config: {
          text: 'Dashboard'
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'emptyOnly' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
