import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AdminDataTableModule } from '../../common';
import { AdminContributorsComponent } from './admin-contributors.component';

const exportedDeclarations = [
  // Pages
  AdminContributorsComponent
];

@NgModule({
  imports: [
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminContributorsModule {}
