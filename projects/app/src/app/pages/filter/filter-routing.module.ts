import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilterPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: FilterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { FilterPageComponent } from './components';

// const routes: Routes = [
//   {
//     path: '',
//     component: FilterPageComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class FilterRoutingModule {}
