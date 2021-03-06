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

import { SharedFileSelectInputModule } from '@shared/components/file-select-input';
import { SharedFileUploadInputModule } from '@shared/components/file-upload-input';
import { AdminDataTableModule } from '../../components';
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
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedFileSelectInputModule,
    SharedFileUploadInputModule,
    TextFieldModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminPhotographsModule {}
