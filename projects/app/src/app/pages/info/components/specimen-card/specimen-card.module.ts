import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { RecursivePropertyPipeModule } from '@shared/pipes/recursive-property-value';
import { SpecimenCardComponent } from './specimen-card.component';

const exportedDeclarations = [
  SpecimenCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    RecursivePropertyPipeModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class SpecimenCardModule {}
