import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { AdminDataTableModule } from '../../common';
import { AdminDefinitionsEditComponent } from './admin-definitions-edit';
import { AdminDefinitionsManageComponent } from './admin-definitions-manage';
import { AdminDefinitionsRoutingModule } from './admin-definitions-routing.module';

const exportedDeclarations: any[] = [
  AdminDefinitionsEditComponent,
  AdminDefinitionsManageComponent
];

@NgModule({
  imports: [
    AdminDefinitionsRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminDefinitionsModule {}
