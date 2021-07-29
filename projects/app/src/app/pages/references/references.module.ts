import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ReferencesPageComponent } from './components';
import { ReferencesRoutingModule } from './references-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReferencesRoutingModule
  ],
  declarations: [
    ReferencesPageComponent
  ]
})
export class ReferencesPageModule {}
