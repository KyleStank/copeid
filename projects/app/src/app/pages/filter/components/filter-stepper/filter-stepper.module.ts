import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { FilterStepComponent } from './filter-step.component';
import { FilterStepperComponent } from './filter-stepper.component';

const exportedDeclarations: any[] = [
  FilterStepComponent,
  FilterStepperComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class FilterStepperModule {}
