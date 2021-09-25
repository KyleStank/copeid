import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { SharedFileSelectInputModule } from '@shared/components/file-select-input';
import { AdminDataTableModule } from '../../common';
import { AdminGenusesEditComponent } from './admin-genuses-edit';
import { AdminGenusesManageComponent } from './admin-genuses-manage';
import { AdminGenusesRoutingModule } from './admin-genuses-routing.module';

const exportedDeclarations = [
  AdminGenusesEditComponent,
  AdminGenusesManageComponent
];

@NgModule({
  imports: [
    AdminGenusesRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedFileSelectInputModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminGenusesModule {}
