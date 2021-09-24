import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FilePreviewDialogData {
  title: string;
  uri: string;
}

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewModalComponent {
  constructor(
    public dialogRef: MatDialogRef<FilePreviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilePreviewDialogData
  ) {}
}
