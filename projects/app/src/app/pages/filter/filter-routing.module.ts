import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { FilterPageComponent, FilterResultPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: FilterPageComponent
  },
  {
    path: 'result/:id',
    component: FilterResultPageComponent,
    data: {
      layout: {
        config: {
          pageName: 'Filter Result'
        }
      } as ILayoutConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule {}
