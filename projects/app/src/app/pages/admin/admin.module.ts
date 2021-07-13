import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import {
  AdminContributorsPageComponent,
  AdminDefinitionsPageComponent,
  AdminGenusesPageComponent,
  AdminPageComponent,
  AdminPhotographsPageComponent,
  AdminSpecimensPageComponent
} from './components';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminPageComponent,
    AdminContributorsPageComponent,
    AdminDefinitionsPageComponent,
    AdminGenusesPageComponent,
    AdminPhotographsPageComponent,
    AdminSpecimensPageComponent
  ]
})
export class AdminPageModule {}