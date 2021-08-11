import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ComponentsModule } from '@shared';
import { DefinitionsPageComponent } from './components';
import { DefinitionsRoutingModule } from './definitions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DefinitionsRoutingModule
  ],
  declarations: [
    DefinitionsPageComponent
  ]
})
export class DefinitionsPageModule {}
