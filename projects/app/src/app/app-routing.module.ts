import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig, TemplateAdminComponent, TemplateDefaultComponent } from './features';

const defaultMenu = [
  { label: 'Home', url: [''], logo: 'home' },
  // { label: 'Contributors', url: ['contributors'], logo: 'group' },
  { label: 'Anatomy & Definitions', url: ['definitions'], logo: 'library_books' },
  // { label: 'Genuses', url: ['genuses'], logo: 'pest_control' },
  // { label: 'Photographs', url: ['photographs'], logo: 'photo_library' },
  { label: 'References', url: ['references'], logo: 'menu_book' },
  // { label: 'Specimens', url: ['specimens'], logo: 'science' }
];

const adminMenu = [
  { label: 'Home', url: ['admin'], logo: 'home' },
  { label: 'Contributors', url: ['admin', 'contributors'], logo: 'group' },
  { label: 'Definitions', url: ['admin', 'definitions'], logo: 'library_books' },
  { label: 'Genuses', url: ['admin', 'genuses'], logo: 'pest_control' },
  { label: 'Photographs', url: ['admin', 'photographs'], logo: 'photo_library' },
  { label: 'References', url: ['admin', 'references'], logo: 'menu_book' },
  { label: 'Specimens', url: ['admin', 'specimens'], logo: 'science' }
];

// TODO: Can we create a custom type that extends Routes and takes a generic type T to define the type of data?
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    data: {
      layout: {
        component: TemplateDefaultComponent,
        config: {
          appName: 'CopeID',
          pageName: 'Dashboard',
          menu: defaultMenu
        }
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
          menu: adminMenu
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'references',
    loadChildren: () => import('./pages/references/references.module').then(m => m.ReferencesPageModule),
    data: {
      layout: {
        component: TemplateDefaultComponent,
        config: {
          appName: 'CopeID',
          pageName: 'References',
          menu: defaultMenu
        }
      } as ILayoutConfig
    }
  },
  {
    path: 'definitions',
    loadChildren: () => import('./pages/definitions/definitions.module').then(m => m.DefinitionsPageModule),
    data: {
      layout: {
        component: TemplateDefaultComponent,
        config: {
          appName: 'CopeID',
          pageName: 'Anatomy & Definitions',
          menu: defaultMenu
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
