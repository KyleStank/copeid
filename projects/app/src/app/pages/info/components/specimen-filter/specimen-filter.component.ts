import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { SpecimenEyes, SpecimenFurca, SpecimenGender, SpecimenSetea, SpecimenThoraxSegments, SpecimenThoraxShape } from '@app/features';
import { ISpecimenFilterValue } from './specimen-filter.model';

@Component({
  selector: 'app-specimen-filter',
  templateUrl: './specimen-filter.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecimenFilterComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  readonly enumSpecimenEyes: typeof SpecimenEyes = SpecimenEyes;
  readonly enumSpecimenGender: typeof SpecimenGender = SpecimenGender;
  readonly enumSpecimenThoraxSegments: typeof SpecimenThoraxSegments = SpecimenThoraxSegments;
  readonly enumSpecimenThoraxShape: typeof SpecimenThoraxShape = SpecimenThoraxShape;
  readonly enumSpecimenFurca: typeof SpecimenFurca = SpecimenFurca;
  readonly enumSpecimenSetea: typeof SpecimenSetea = SpecimenSetea;
  readonly formGroup = this._fb.group({
    genusName: [undefined],
    gender: [undefined],
    lengthGreaterThan: [undefined, Validators.min(0)],
    lengthLessThan: [undefined, Validators.min(0)],
    antenule: [undefined],
    rostrum: [undefined],
    bodyShape: [undefined],
    eyes: [undefined],
    cephalosome: [undefined, Validators.min(0)],
    thoraxSegments: [undefined],
    thoraxShape: [undefined],
    urosome: [undefined, Validators.min(0)],
    furca: [undefined],
    setea: [undefined]
  });
  filter: ISpecimenFilterValue | undefined;

  @Output()
  filterChange = new EventEmitter<ISpecimenFilterValue>();

  constructor(private readonly _fb: FormBuilder) {
    this.formGroup.valueChanges.pipe(
      takeUntil(this._destroyed)
    ).subscribe({
      next: (formValue: ISpecimenFilterValue) => {
        if (this.formGroup.valid) this.filterChange.emit(formValue);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
