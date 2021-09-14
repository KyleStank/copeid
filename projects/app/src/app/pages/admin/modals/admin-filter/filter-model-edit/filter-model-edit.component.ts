import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FilterModel } from '@app/features';

interface AdminFilterModelEditModalData {
  types?: string[];
  model?: FilterModel;
}

@Component({
  selector: 'app-filter-model-edit',
  templateUrl: './filter-model-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelEditModalComponent {
  types: string[];
  model: FilterModel;

  constructor(
    public readonly dialogRef: MatDialogRef<any>,
    public readonly detectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: AdminFilterModelEditModalData
  ) {
    this.types = data?.types ?? [];
    this.model = {
      id: data?.model?.id ?? undefined,
      typeName: data?.model?.typeName ?? undefined,
      filterModelProperties: data?.model?.filterModelProperties ?? undefined
    };
  }
}
