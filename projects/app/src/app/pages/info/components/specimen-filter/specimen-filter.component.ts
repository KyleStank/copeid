import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Specimen } from '@app/features';

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

  readonly formGroup = this._fb.group({
    genusName: [''],
    lengthGreaterThan: [null, Validators.min(0)],
    lengthLessThan: [null, Validators.min(0)]
  });

  @Input()
  specimens: Specimen[] = [];

  constructor(private readonly _fb: FormBuilder) {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
