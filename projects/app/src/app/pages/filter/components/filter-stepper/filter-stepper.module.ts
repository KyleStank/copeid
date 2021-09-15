import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { FilterStepContainerComponent } from './filter-step-container.component';
import { FilterStepComponent } from './filter-step.component';
import { FilterStepperComponent } from './filter-stepper.component';
import { FilterStepOptionDefinitionDirective, FilterStepOutletDirective, FilterStepPartOutletDirective } from './filter-stepper.directive';

const exportedDeclarations: any[] = [
  FilterStepOptionDefinitionDirective,
  FilterStepOutletDirective,
  FilterStepPartOutletDirective,

  FilterStepContainerComponent,
  FilterStepComponent,
  FilterStepperComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class FilterStepperModule {}
