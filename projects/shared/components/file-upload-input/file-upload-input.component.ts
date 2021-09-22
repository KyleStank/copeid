import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { distinctUntilChanged, filter, Subject, Subscription, takeUntil } from 'rxjs';

import { isTypeOf } from '@shared/utils';

@Component({
  selector: 'app-file-upload-input',
  templateUrl: './file-upload-input.component.html',
  host: {
    'class': 'd-inline-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadInputComponent implements OnChanges, OnDestroy {
  private readonly _destroyed = new Subject<void>();
  private _subscription: Subscription | undefined;

  @Input()
  ariaLabel: string | undefined;

  @Input()
  color: ThemePalette = 'primary';

  @Input()
  control: string | AbstractControl | undefined;

  @Input()
  group: FormGroup | undefined;

  @Output()
  uploaded = new EventEmitter<File>();

  fileName: string | undefined;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    // Convert control to an AbstractControl is a name and form group were supplied.
    if (isTypeOf(this.control, String) && isTypeOf(this.group, FormGroup)) {
      const controlName = this.control as string;
      if (this.group!.contains(controlName)) this.control = this.group!.get(controlName) as AbstractControl;
    }

    // Set the form group if no form group was supplied but a control was.
    if (isTypeOf(this.control, AbstractControl) && !isTypeOf(this.group, FormGroup)) {
      this.group = (this.control as AbstractControl).parent as FormGroup;
    }

    // Listen for changes.
    if (isTypeOf(this.control, AbstractControl)) {
      if (this._subscription != null) this._subscription.unsubscribe();

      this._subscription = (this.control as AbstractControl).valueChanges.pipe(
        takeUntil(this._destroyed),
        distinctUntilChanged(),
        filter(data => data == null)
      ).subscribe({
        next: _ => {
          this.fileName = undefined;
          this._changeDetectorRef.markForCheck();
        }
      });
    }
  }

  fileSelected(event: Event): void {
    event.stopPropagation();

    const file: File = (event.target as any).files[0] as File;
    if (!!file) {
      this.fileName = file.name;
      if (!!this.control) (this.control as AbstractControl).setValue(file);
      this.uploaded.emit(file);
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this._subscription != null) this._subscription.unsubscribe();
  }
}
