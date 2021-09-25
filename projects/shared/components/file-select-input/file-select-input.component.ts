import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';

import { IEntity } from '@core/models/entity';
import { isTypeOf } from '@shared/utils';

@Component({
  selector: 'app-file-select-input',
  templateUrl: './file-select-input.component.html',
  host: {
    'class': 'd-inline-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSelectInputComponent implements OnChanges, OnDestroy {
  private readonly _destroyed = new Subject<void>();
  private _subscription: Subscription | undefined;

  @Input()
  appearance: MatFormFieldAppearance = 'fill';

  @Input()
  ariaLabel: string | undefined;

  @Input()
  color: ThemePalette = 'primary';

  @Input()
  contentProperty: string | undefined;

  @Input()
  control: AbstractControl | FormControl | undefined;

  @Input()
  data: IEntity[] = [];

  @Input()
  label: string | undefined;

  @Input()
  valueProperty: string | undefined;

  @Output()
  preview = new EventEmitter<string>();

  ngOnChanges(): void {
    if (!isTypeOf(this.control, AbstractControl)) this.control = undefined;
  }

  previewFile(): void {
    this.preview.emit(this.control!.value as string);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this._subscription != null) this._subscription.unsubscribe();
  }
}
