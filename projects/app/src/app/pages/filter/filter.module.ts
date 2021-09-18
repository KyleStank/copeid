import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { LayoutTemplatesModule } from '@core/layouts/templates';
import { SnackBarModule } from '@core/services/snackbar';
import { SharedInfoCardModule } from '@shared/components/info-card';
import { FilterPageComponent, FilterResultPageComponent } from './pages';
import { FilterStepperModule } from './components';
import { FilterRoutingModule } from './filter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FilterStepperModule,
    FilterRoutingModule,
    LayoutTemplatesModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    SharedInfoCardModule,
    SnackBarModule
  ],
  declarations: [
    // Pages
    FilterPageComponent,
    FilterResultPageComponent
  ]
})
export class FilterPageModule {}
