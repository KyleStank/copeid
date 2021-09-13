import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { FilterSectionOption, FilterSectionOptionService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-options-edit',
  templateUrl: './admin-filter-sections-options-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionOptionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsOptionsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterSectionOption | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _typesSubject = new BehaviorSubject<string[]>([]);
  readonly types$ = this._typesSubject.asObservable();

  readonly formGroup = this._fb.group({
    displayName: ['', Validators.required],
    value: ['', Validators.required]
  });

  filterSectionOptionId: string | undefined;
  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterSectionOptionService: FilterSectionOptionService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            displayName: result.displayName,
            value: result.value
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.filterSectionOptionId = this._activatedRoute.snapshot.paramMap.get('filterSectionOptionId') ?? undefined;
    if (!!this.filterSectionOptionId) {
      this._filterSectionOptionService.getSingle(this.filterSectionOptionId).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this.filterSectionId = this._activatedRoute.snapshot.paramMap.get('filterSectionId') ?? undefined;
    if (!this.filterSectionId) {
      this.filterSectionId = this._activatedRoute.snapshot.parent?.paramMap.get('filterSectionId') ?? undefined;
    }
  }

  save(): Observable<FilterSectionOption> {
    const model: FilterSectionOption = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.filterSectionOptionId,
      filterSectionId: this.filterSectionId
    };

    return !!model.id ? this._filterSectionOptionService.update(model) : this._filterSectionOptionService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
