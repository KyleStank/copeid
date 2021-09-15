import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { FilterStepContainerComponent } from './filter-step-container.component';
import { FilterStepComponent } from './filter-step.component';
import { FilterStepperComponent } from './filter-stepper.component';

const exportedDeclarations: any[] = [
  FilterStepContainerComponent,
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
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class FilterStepperModule {}
