import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SnackBarModule } from '@core/services/snackbar';
import { RecursivePropertyPipeModule } from '@shared/pipes/recursive-property-value';
import { FilterStepperModule } from '../../components';
import { FilterResultSelectionModalComponent } from './filter-result-selection';
import { FilterRoutingModule } from './filter-routing.module';
import { FilterPageComponent } from './filter.component';

const exportedDeclarations = [
  FilterPageComponent,
  FilterResultSelectionModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FilterStepperModule,
    FilterRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    RecursivePropertyPipeModule,
    SnackBarModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class FilterModule {}
