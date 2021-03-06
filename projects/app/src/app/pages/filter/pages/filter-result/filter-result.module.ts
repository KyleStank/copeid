import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { FilterResultRoutingModule } from './filter-result-routing.module';
import { FilterResultPageComponent } from './filter-result.component';

const exportedDeclarations = [
  FilterResultPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    FilterResultRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class FilterResultModule {}
