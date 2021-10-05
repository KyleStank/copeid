import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SharedInfoCardModule } from '@shared/components/info-card';
import { ReferencesRoutingModule } from './references-routing.module';
import { ReferencesPageComponent } from './references.component';

const exportedDeclarations = [
  ReferencesPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ReferencesRoutingModule,
    SharedInfoCardModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class ReferencesModule {}
