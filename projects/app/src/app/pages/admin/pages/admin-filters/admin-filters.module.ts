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
import { AdminFiltersSectionsEditComponent } from './admin-filter-sections-edit';
import { AdminFiltersSectionsManageComponent } from './admin-filter-sections-manage';
import { AdminFiltersSectionsPartsEditComponent } from './admin-filter-sections-parts-edit';
import { AdminFiltersSectionsPartsManageComponent } from './admin-filter-sections-parts-manage';
import { AdminFiltersSectionsPartsOptionsEditComponent } from './admin-filter-sections-parts-options-edit';
import { AdminFiltersSectionsPartsOptionsManageComponent } from './admin-filter-sections-parts-options-manage';
import { AdminFiltersEditComponent } from './admin-filters-edit';
import { AdminFiltersManageComponent } from './admin-filters-manage';
import { AdminFiltersRoutingModule } from './admin-filters-routing.module';

const exportedDeclarations: any[] = [
  AdminFiltersSectionsEditComponent,
  AdminFiltersSectionsManageComponent,
  AdminFiltersSectionsPartsEditComponent,
  AdminFiltersSectionsPartsManageComponent,
  AdminFiltersSectionsPartsOptionsEditComponent,
  AdminFiltersSectionsPartsOptionsManageComponent,
  AdminFiltersEditComponent,
  AdminFiltersManageComponent
];

@NgModule({
  imports: [
    AdminFiltersRoutingModule,
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
export class AdminFiltersModule {}
