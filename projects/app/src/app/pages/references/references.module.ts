import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SharedInfoCardModule } from '@shared/components/info-card';
import { ReferencesPageComponent } from './components';
import { ReferencesRoutingModule } from './references-routing.module';

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
  declarations: [
    ReferencesPageComponent
  ]
})
export class ReferencesPageModule {}
