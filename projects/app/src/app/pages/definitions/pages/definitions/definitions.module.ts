import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SnackBarModule } from '@core/services/snackbar';
import { SharedInfoCardModule } from '@shared/components/info-card';
import { DefinitionsRoutingModule } from './definitions-routing.module';
import { DefinitionsPageComponent } from './definitions.component';

const exportedDeclarations = [
  DefinitionsPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    DefinitionsRoutingModule,
    SharedInfoCardModule,
    SnackBarModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class DefinitionsModule {}
