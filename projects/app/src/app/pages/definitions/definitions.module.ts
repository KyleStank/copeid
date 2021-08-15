import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SharedPageHeaderModule } from '@shared/components/page-header';
import { DefinitionsPageComponent } from './components';
import { DefinitionsRoutingModule } from './definitions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DefinitionsRoutingModule,
    SharedPageHeaderModule,
  ],
  declarations: [
    DefinitionsPageComponent
  ]
})
export class DefinitionsPageModule {}
