import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminDefinitionsComponent } from './admin-definitions.component';

const exportedDeclarations = [
  // Pages
  AdminDefinitionsComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminDefinitionsModule {}
