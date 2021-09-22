import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

import { AdminEditSectionComponent } from './admin-edit-section';
import { AdminEditContainerComponent } from './admin-edit-container.component';

const exportedDeclarations = [
  AdminEditSectionComponent,
  AdminEditContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    RouterModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class AdminEditModule {}
