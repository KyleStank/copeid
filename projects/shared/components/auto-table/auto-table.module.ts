import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import {
  AutoDataCellComponent,
  AutoHeaderCellComponent,
  AutoTableComponent
} from './components';
import {
  AutoColumnDefDirective,
  AutoDataCellOverrideDirective,
  AutoHeaderCellOverrideDirective,
  AutoPaginatorDirective
} from './directives';
import {
  AutoDynamicPipe,
  AutoPropertyValuePipe
} from './pipes';

const exportedDeclarations: any[] = [
  // Components
  AutoDataCellComponent,
  AutoHeaderCellComponent,
  AutoTableComponent,

  // Directives
  AutoColumnDefDirective,
  AutoDataCellOverrideDirective,
  AutoHeaderCellOverrideDirective,
  AutoPaginatorDirective,

  // Pipes
  AutoDynamicPipe,
  AutoPropertyValuePipe
];

@NgModule({
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class SharedAutoTableModule {}
