import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDataTableComponent } from './common';
import {
  AdminContributorsPageComponent,
  AdminDefinitionsPageComponent,
  AdminGenusesPageComponent,
  AdminPageComponent,
  AdminPhotographsPageComponent,
  AdminSpecimensPageComponent
} from './components';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    PortalModule
  ],
  declarations: [
    // Common
    AdminDataTableComponent,

    // Components
    AdminPageComponent,
    AdminContributorsPageComponent,
    AdminDefinitionsPageComponent,
    AdminGenusesPageComponent,
    AdminPhotographsPageComponent,
    AdminSpecimensPageComponent
  ]
})
export class AdminPageModule {}
