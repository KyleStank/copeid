import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { SharedAutoTableModule } from '@shared/components/auto-table';
import { AdminDataTableMenuOutletDirective } from './admin-data-table-menu-outlet.directive';
import { AdminDataTableMenuDirective } from './admin-data-table-menu.directive';
import { AdminDataTableComponent } from './admin-data-table.component';

const exportedDeclarations = [
  // Components
  AdminDataTableComponent,

  // Directives
  AdminDataTableMenuOutletDirective,
  AdminDataTableMenuDirective
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SharedAutoTableModule,
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminDataTableModule {}
