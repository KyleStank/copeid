import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { AdminDataTableModule } from '../../common';
import { AdminContributorsEditComponent } from './admin-contributors-edit';
import { AdminContributorsManageComponent } from './admin-contributors-manage';
import { AdminContributorsRoutingModule } from './admin-contributors-routing.module';

const exportedDeclarations = [
  AdminContributorsEditComponent,
  AdminContributorsManageComponent
];

@NgModule({
  imports: [
    AdminContributorsRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminContributorsModule {}
