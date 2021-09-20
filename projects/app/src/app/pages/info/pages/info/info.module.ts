import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SpecimenCardModule } from '../../components';
import { InfoRoutingModule } from './info-routing.module';
import { InfoPageComponent } from './info.component';

const exportedDeclarations = [
  InfoPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SpecimenCardModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class InfoModule {}
