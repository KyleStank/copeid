import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SharedInfoCardModule } from '@shared/components/info-card';
import { FilterSectionCardComponent } from './common';
import { FilterPageComponent } from './components';
import { FilterLengthSectionComponent } from './sections';
import { FilterRoutingModule } from './filter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    FilterRoutingModule,
    SharedInfoCardModule
  ],
  declarations: [
    // Common
    FilterSectionCardComponent,

    // Components
    FilterPageComponent,

    // Sections
    FilterLengthSectionComponent
  ]
})
export class FilterPageModule {}
