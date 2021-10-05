import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgxEditorModule } from 'ngx-editor';

import { AdminDataTableModule } from '../../components';
import { AdminReferencesEditComponent } from './admin-references-edit';
import { AdminReferencesManageComponent } from './admin-references-manage';
import { AdminReferencesRoutingModule } from './admin-references-routing.module';

const exportedDeclarations = [
  AdminReferencesEditComponent,
  AdminReferencesManageComponent
];

@NgModule({
  imports: [
    AdminReferencesRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    NgxEditorModule,
    ReactiveFormsModule,
    TextFieldModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminReferencesModule {}
