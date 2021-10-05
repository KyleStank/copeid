import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { SharedFileUploadInputModule } from '@shared/components/file-upload-input';
import { AdminDataTableModule } from '../../components';
import { AdminDocumentsEditComponent } from './admin-documents-edit';
import { AdminDocumentsManageComponent } from './admin-documents-manage';
import { AdminDocumentsRoutingModule } from './admin-documents-routing.module';

const exportedDeclarations: any[] = [
  AdminDocumentsEditComponent,
  AdminDocumentsManageComponent
];

@NgModule({
  imports: [
    AdminDataTableModule,
    AdminDocumentsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedFileUploadInputModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminDocumentsModule {}
