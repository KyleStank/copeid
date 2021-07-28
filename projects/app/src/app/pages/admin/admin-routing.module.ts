import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@app/features';
import {
  AdminContributorsPageComponent,
  AdminDefinitionsPageComponent,
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
      }
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
      }
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
      }
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
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
