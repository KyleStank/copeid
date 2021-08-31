import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { DynamicPropertyPipe } from './dynamic-property-pipe';
import { SimpleTableComponent } from './simple-table.component';

const exportedDeclarations = [
  // Components
  SimpleTableComponent,

  // Pipes
  DynamicPropertyPipe
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class SharedSimpleTableModule {}
