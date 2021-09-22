import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

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
export class FilterLengthSectionComponent implements IFilterSection, OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _optionSelectedSubject = new BehaviorSubject<IFilterDefinitionSelected>(undefined as any);
  readonly optionSelected$ = this._optionSelectedSubject.asObservable();

  @Input()
  filterDefinition: IFilterDefinition<string, number> | undefined;

  @Input()
  selectedOption: IFilterOption<string, number> | undefined;

  constructor() {
    this.optionSelected$ = this.optionSelected$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    if (this.selectedOption) {
      this.selectOption(this.selectedOption);
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  resetLayout(): void {}

  selectOption(option: IFilterOption<string, number>): void {
    if (this.filterDefinition && option) {
      this._optionSelectedSubject.next({
        identifier: this.filterDefinition.identifier,
        option
      });
    }
  }
}
