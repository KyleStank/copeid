import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig, TemplateAdminComponent, TemplateDefaultComponent } from './features';

// TODO: Can we create a custom type that extends Routes and takes a generic type T to define the type of data?
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    data: {
      layout: {
        component: TemplateDefaultComponent
      } as ILayoutConfig
    }
  },
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
    data: {
      layout: {
        component: TemplateAdminComponent,
        config: {
          menu: [
            { label: 'Dashboard', url: ['admin'], logo: 'home' },
            { label: 'Contributors', url: ['admin', 'contributors'], logo: 'group' },
            { label: 'Definitions', url: ['admin', 'definitions'], logo: 'library_books' },
            { label: 'Genuses', url: ['admin', 'genuses'], logo: 'pest_control' },
            { label: 'Photographs', url: ['admin', 'photographs'], logo: 'photo_library' },
            { label: 'Specimens', url: ['admin', 'specimens'], logo: 'science' }
          ]
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
