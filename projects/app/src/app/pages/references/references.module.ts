import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SharedPageHeaderModule } from '@shared/components/page-header';
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
    SharedPageHeaderModule
  ],
  declarations: [
    ReferencesPageComponent
  ]
})
export class ReferencesPageModule {}
