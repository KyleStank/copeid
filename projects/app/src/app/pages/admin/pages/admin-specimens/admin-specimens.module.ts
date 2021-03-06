import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { SharedFileSelectInputModule } from '@shared/components/file-select-input';
import { AdminDataTableModule, AdminEditModule } from '../../components';
import { AdminSpecimensEditComponent } from './admin-specimens-edit';
import { AdminSpecimensManageComponent } from './admin-specimens-manage';
import { AdminSpecimensRoutingModule } from './admin-specimens-routing.module';

const exportedDeclarations = [
  AdminSpecimensEditComponent,
  AdminSpecimensManageComponent
];

@NgModule({
  imports: [
    AdminSpecimensRoutingModule,
    AdminEditModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedFileSelectInputModule,
    TextFieldModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminSpecimensModule {}
