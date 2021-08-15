import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SnackBarModule } from '@core';
import { SharedPageHeaderModule } from '@shared/components/page-header';
import { SingleDefinitionComponent } from './common';
import { DefinitionsPageComponent } from './components';
import { DefinitionsRoutingModule } from './definitions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    DefinitionsRoutingModule,
    SharedPageHeaderModule,
    SnackBarModule
  ],
  declarations: [
    // Common
    SingleDefinitionComponent,

    // Components
    DefinitionsPageComponent
  ]
})
export class DefinitionsPageModule {}
