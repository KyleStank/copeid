import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

import { AdminManageContainerComponent } from './admin-manage-container.component';

const exportedDeclarations = [
  AdminManageContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class AdminManageModule {}
