import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FilterModelProperty } from '@app/features';

interface AdminFilterModelPropertiesEditModalData {
  properties?: string[];
  model?: FilterModelProperty;
}

@Component({
  selector: 'app-filter-model-properties-edit',
  templateUrl: './filter-model-properties.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelPropertiesEditModalComponent {
  properties: string[];
  model: FilterModelProperty;

  constructor(
    public readonly dialogRef: MatDialogRef<any>,
    public readonly detectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: AdminFilterModelPropertiesEditModalData
  ) {
    this.properties = data?.properties ?? [];
    this.model = {
      id: data?.model?.id ?? undefined,
      filterModelId: data?.model?.filterModelId ?? undefined,
      propertyName: data?.model?.propertyName ?? undefined
    };
  }
}
