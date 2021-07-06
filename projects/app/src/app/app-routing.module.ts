import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderDefaultComponent, IHeaderConfig } from './features';

// TODO: Can we create a custom type that extends Routes and takes a generic type T to define the type of data?
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    data: {
      showHeader: true,
      showFooter: false,

      header: {
        active: true,
        component: HeaderDefaultComponent
      } as IHeaderConfig
    }
  },
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
