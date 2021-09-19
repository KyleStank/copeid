import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ILayoutConfig } from '@core/layouts/models';
import { FilterResultPageComponent } from './filter-result.component';

const routes: Routes = [
  {
    path: ':id',
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
export class FilterResultRoutingModule {}
