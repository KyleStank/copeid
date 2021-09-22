import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FileUploadInputComponent } from './file-upload-input.component';

const exportedDeclarations = [
  FileUploadInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class SharedFileUploadInputModule {}
