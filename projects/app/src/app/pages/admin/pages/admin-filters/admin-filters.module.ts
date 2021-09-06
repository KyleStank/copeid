import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminFiltersComponent } from './admin-filters.component';

const exportedDeclarations = [
  // Pages
  AdminFiltersComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminFiltersModule {}
