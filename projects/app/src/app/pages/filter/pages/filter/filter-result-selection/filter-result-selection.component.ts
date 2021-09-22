import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { IEntity } from '@core/models/entity';
import { IFilterResultSelectionModalData } from './filter-result-selection.model';

@Component({
  selector: 'app-filter-result-selection-modal',
  templateUrl: './filter-result-selection.component.html',
  styleUrls: ['./filter-result-selection.component.scss'],
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterResultSelectionModalComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _selectedResultSubject = new BehaviorSubject<IEntity | undefined>(undefined);
  readonly selectedResult$ = this._selectedResultSubject.asObservable();

  readonly results: IEntity[] = [];
  readonly displayProperty: string | undefined;
  readonly infoProperties: KeyValue<string, string>[] = [];

  readonly selectionControl = new FormControl(null, Validators.required);

  constructor(
    readonly dialogRef: MatDialogRef<FilterResultSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) @Optional() readonly data?: IFilterResultSelectionModalData
  ) {
    this.selectedResult$ = this.selectedResult$.pipe(takeUntil(this._destroyed));

    if (!!this.data) {
      this.results = this.data.results ?? [];
      this.displayProperty = this.data.displayProperty ?? undefined;
      this.infoProperties = this.data.infoProperties ?? [];

      this.selectionControl.valueChanges.pipe(
        takeUntil(this._destroyed)
      ).subscribe({
        next: id => this._selectedResultSubject.next(this.results.find(r => r.id === id))
      });
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
