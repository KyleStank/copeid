import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { FileSelectInputComponent } from './file-select-input.component';

const exportedDeclarations = [
  FileSelectInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class SharedFileSelectInputModule {}
