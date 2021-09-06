import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { AdminDataTableModule } from '../../common';
import { AdminContributorEditComponent } from './admin-contributor-edit/admin-contributor-edit.component';
import { AdminContributorsRoutingModule } from './admin-contributors-routing.module';
import { AdminContributorsComponent } from './admin-contributors.component';

const exportedDeclarations = [
  // Pages
  AdminContributorEditComponent,
  AdminContributorsComponent
];

@NgModule({
  imports: [
    AdminContributorsRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminContributorsModule {}
