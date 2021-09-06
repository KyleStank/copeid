import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminReferencesComponent } from './admin-references.component';

const exportedDeclarations = [
  // Pages
  AdminReferencesComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminReferencesModule {}
