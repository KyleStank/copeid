import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/filter-result/filter-result.module').then(m => m.FilterResultModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterPageRoutingModule {}
