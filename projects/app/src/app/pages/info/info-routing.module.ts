import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/info/info.module').then(m => m.InfoModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/info-single/info-single.module').then(m => m.InfoSingleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule {}
