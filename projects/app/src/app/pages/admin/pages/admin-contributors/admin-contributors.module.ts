import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminContributorsComponent } from './admin-contributors.component';

const exportedDeclarations = [
  // Pages
  AdminContributorsComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminContributorsModule {}
