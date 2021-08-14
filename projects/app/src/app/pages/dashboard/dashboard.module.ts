import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from '@shared';

import { DashboardEditPageComponent, DashboardPageComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DashboardRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    DashboardEditPageComponent,
    DashboardPageComponent
  ]
})
export class DashboardPageModule {}
