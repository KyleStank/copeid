import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent]
})
export class SharedPageHeaderModule {}
