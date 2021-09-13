import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FilterSectionPartOption, FilterSectionPartOptionService } from '@app/features';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-parts-options-edit',
  templateUrl: './admin-filter-sections-parts-options-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionPartOptionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsPartsOptionsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterSectionPartOption | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  readonly formGroup = this._fb.group({
    displayName: ['', Validators.required],
    code: ['', Validators.required],
    value: ['', Validators.required]
  });

  filterSectionPartOptionId: string | undefined;
  filterSectionPartId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterSectionPartOptionService: FilterSectionPartOptionService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            displayName: result.displayName,
            code: result.code,
            value: result.value
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.filterSectionPartOptionId = this._activatedRoute.snapshot.paramMap.get('filterSectionPartOptionId') ?? undefined;
    if (!!this.filterSectionPartOptionId) {
      this._filterSectionPartOptionService.getSingle(this.filterSectionPartOptionId).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this.filterSectionPartId = this._activatedRoute.snapshot.paramMap.get('filterSectionPartId') ?? undefined;
    if (!this.filterSectionPartId) {
      this.filterSectionPartId = this._activatedRoute.snapshot.parent?.paramMap.get('filterSectionPartId') ?? undefined;
    }
  }

  save(): Observable<FilterSectionPartOption> {
    const model: FilterSectionPartOption = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.filterSectionPartOptionId,
      filterSectionPartId: this.filterSectionPartId
    };

    return !!model.id ? this._filterSectionPartOptionService.update(model) : this._filterSectionPartOptionService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
