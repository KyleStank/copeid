import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { DashboardEditPageComponent, DashboardPageComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardEditPageComponent,
    DashboardPageComponent
  ]
})
export class DashboardPageModule {}
