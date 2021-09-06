import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminGenusesComponent } from './admin-genuses.component';

const exportedDeclarations = [
  // Pages
  AdminGenusesComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminGenusesModule {}
