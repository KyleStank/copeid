import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PageHeaderComponent } from './page-header/page-header.component';

const exportedDeclarations: any[] = [
  PageHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class ComponentsModule {}
