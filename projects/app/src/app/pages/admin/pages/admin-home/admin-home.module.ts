import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminHomeComponent } from './admin-home.component';

const exportedDeclarations = [
  // Pages
  AdminHomeComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminHomeModule {}
