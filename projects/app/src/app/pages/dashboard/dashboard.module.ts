import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { DashboardEditPageComponent, DashboardPageComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardEditPageComponent,
    DashboardPageComponent
  ]
})
export class DashboardPageModule {}
