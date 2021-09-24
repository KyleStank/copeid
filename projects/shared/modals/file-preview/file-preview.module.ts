import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FilePreviewModalComponent } from './file-preview.component';

const exportedDeclarations = [
  FilePreviewModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class SharedFilePreviewModalModule {}
