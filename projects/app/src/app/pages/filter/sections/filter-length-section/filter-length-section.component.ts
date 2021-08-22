import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IFilterDefinition, IFilterDefinitionSelected, IFilterOption, IFilterSection } from '../../models';

@Component({
  selector: 'app-filter-length-section',
  templateUrl: './filter-length-section.component.html',
  styleUrls: [
    '../filter-sections-common.scss',
    './filter-length-section.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterLengthSectionComponent implements IFilterSection, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _optionSelectedSubject = new Subject<IFilterDefinitionSelected>();
  readonly optionSelected$ = this._optionSelectedSubject.asObservable();

  readonly filterDefinition: IFilterDefinition<string, number> = {
    identifier: 'L',
    options: [
      { key: 'Z', value: 0.5 },
      { key: 'Y', value: 1.0 },
      { key: 'X', value: 1.5 },
      { key: 'W', value: 2.0 }
    ]
  };

  constructor() {
    this.optionSelected$ = this.optionSelected$.pipe(takeUntil(this._destroyed));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  resetLayout(): void {}

  selectOption(option: IFilterOption<string, number>): void {
    this._optionSelectedSubject.next({
      identifier: this.filterDefinition.identifier,
      option
    });
  }
}
