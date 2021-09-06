import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminSpecimensComponent } from './admin-specimens.component';

const exportedDeclarations = [
  // Pages
  AdminSpecimensComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminSpecimensModule {}
