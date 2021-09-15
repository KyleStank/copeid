import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { LayoutTemplatesModule } from '@core/layouts/templates';
import { SharedInfoCardModule } from '@shared/components/info-card';
// import { FilterSectionCardComponent } from './common';
// import { FilterPageComponent } from './components';
// import { FilterLengthSectionComponent } from './sections';
import { FilterPageComponent } from './pages';
import { FilterStepperComponent } from './components';
import { FilterRoutingModule } from './filter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FilterRoutingModule,
    LayoutTemplatesModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    SharedInfoCardModule
  ],
  declarations: [
    // Components
    FilterStepperComponent,

    // Pages
    FilterPageComponent

    // // Common
    // FilterSectionCardComponent,

    // // Components
    // FilterPageComponent,

    // // Sections
    // FilterLengthSectionComponent
  ]
})
export class FilterPageModule {}
