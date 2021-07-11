import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@app/features';
import { AdminPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: {
      layout: {
        config: {
          menu: [
            { label: 'Dashboard', logo: 'home' },
            { label: 'Genuses', url: 'genuses', logo: 'pest_control' },
            { label: 'Photographs', url: 'photographs', logo: 'photo_library' },
            { label: 'Specimens', url: 'specimens', logo: 'science' }
          ]
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
