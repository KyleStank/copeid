import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { SharedFileSelectInputModule } from '@shared/components/file-select-input';
import { SharedFileUploadInputModule } from '@shared/components/file-upload-input';
import { SharedFilePreviewModalModule } from '@shared/modals/file-preview';
import { AdminDataTableModule } from '../../common';
import { AdminPhotographsEditComponent } from './admin-photographs-edit';
import { AdminPhotographsManageComponent } from './admin-photographs-manage';
import { AdminPhotographsRoutingModule } from './admin-photographs-routing.module';

const exportedDeclarations = [
  AdminPhotographsEditComponent,
  AdminPhotographsManageComponent
];

@NgModule({
  imports: [
    AdminPhotographsRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedFilePreviewModalModule,
    SharedFileSelectInputModule,
    SharedFileUploadInputModule,
    TextFieldModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminPhotographsModule {}
