import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { AdminDataTableModule } from '../../components';
import { AdminFilterModelsEditComponent } from './admin-filter-models-edit';
import { AdminFilterModelsEditPropertiesComponent  } from './admin-filter-models-edit-properties';
import { AdminFilterModelsManageComponent } from './admin-filter-models-manage';
import { AdminFilterModelsManagePropertiesComponent } from './admin-filter-models-manage-properties';
import { AdminFilterModelsRoutingModule } from './admin-filter-models-routing.module';

const exportedDeclarations: any[] = [
  AdminFilterModelsEditComponent,
  AdminFilterModelsEditPropertiesComponent,
  AdminFilterModelsManageComponent,
  AdminFilterModelsManagePropertiesComponent
];

@NgModule({
  imports: [
    AdminFilterModelsRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminFilterModelsModule {}
