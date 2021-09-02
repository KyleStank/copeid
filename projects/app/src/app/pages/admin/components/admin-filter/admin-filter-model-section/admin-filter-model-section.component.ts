import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FilterModel } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { AdminFilterModelEditModalComponent } from '../../../modals';

@Component({
  selector: 'app-admin-filter-model-section',
  templateUrl: './admin-filter-model-section.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelSectionComponent {
  readonly columns: AdminColumn[] = [
    { title: 'Type', property: 'typeName' }
  ];

  @Input()
  data: FilterModel[] | undefined;

  @Input()
  types: string[] = [];

  @Output()
  editModalClose = new EventEmitter<FilterModel>();

  @Output()
  deleteModalClose = new EventEmitter<FilterModel[]>();

  selectedItems: FilterModel[] = [];

  constructor(readonly dialog: MatDialog) {}

  toggleEntity(selected: FilterModel[]): void {
    this.selectedItems = selected;
  }

  openEditModal(model?: FilterModel): void {
    const dialogRef = this.dialog.open(AdminFilterModelEditModalComponent, {
      data: {
        types: this.types,
        model
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe({
      next: (filterModel: FilterModel) => {
        if (!filterModel?.typeName) return;

        this.editModalClose.emit(filterModel);
      }
    });
  }



  openDeleteModal(models?: FilterModel[]): void {
    models = models ?? this.selectedItems;

    const dialogRef = this.dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete Filter ${models.length === 1 ? 'Model' : 'Models'}`,
        message: `Are you sure you want to delete ${models.length === 1 ? 'this Filter Model' : 'these Filter Models'}?`
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.deleteModalClose.emit(models);
        }
      }
    });
  }
}
