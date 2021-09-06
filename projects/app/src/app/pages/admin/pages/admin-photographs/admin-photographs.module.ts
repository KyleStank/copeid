import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminPhotographsComponent } from './admin-photographs.component';

const exportedDeclarations = [
  // Pages
  AdminPhotographsComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminPhotographsModule {}
