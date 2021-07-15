import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ModalsModule } from '@shared';
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
import { AdminEditModalComponent } from './modals';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ModalsModule,
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
    AdminSpecimensPageComponent,

    // Modals
    AdminEditModalComponent
  ]
})
export class AdminPageModule {}
