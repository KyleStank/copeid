import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { FilterSectionPart, FilterSectionPartService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-parts-edit',
  templateUrl: './admin-filter-sections-parts-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionPartService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsPartsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterSectionPart | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  readonly formGroup = this._fb.group({
    displayName: ['', Validators.required]
  });

  filterSectionPartId: string | undefined;
  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterSectionPartService: FilterSectionPartService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            displayName: result.displayName
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.filterSectionPartId = this._activatedRoute.snapshot.paramMap.get('filterSectionPartId') ?? undefined;
    if (!!this.filterSectionPartId) {
      this._filterSectionPartService.getSingle(this.filterSectionPartId).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this.filterSectionId = this._activatedRoute.snapshot.paramMap.get('filterSectionId') ?? undefined;
    if (!this.filterSectionId) {
      this.filterSectionId = this._activatedRoute.snapshot.parent?.paramMap.get('filterSectionId') ?? undefined;
    }
  }

  save(): Observable<FilterSectionPart> {
    const model: FilterSectionPart = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.filterSectionPartId,
      filterSectionId: this.filterSectionId
    };

    return !!model.id ? this._filterSectionPartService.update(model) : this._filterSectionPartService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
