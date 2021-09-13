import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { FilterSection, FilterSectionService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-edit',
  templateUrl: './admin-filter-sections-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterSection | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _typesSubject = new BehaviorSubject<string[]>([]);
  readonly types$ = this._typesSubject.asObservable();

  readonly formGroup = this._fb.group({
    displayName: ['', Validators.required],
    code: ['', Validators.required]
  });

  filterId: string | undefined;
  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterSectionService: FilterSectionService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            displayName: result.displayName,
            code: result.code
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.filterSectionId = this._activatedRoute.snapshot.paramMap.get('filterSectionId') ?? undefined;
    if (!!this.filterSectionId) {
      this._filterSectionService.getSingle(this.filterSectionId).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this.filterId = this._activatedRoute.snapshot.paramMap.get('filterId') ?? undefined;
    if (!this.filterId) {
      this.filterId = this._activatedRoute.snapshot.parent?.paramMap.get('filterId') ?? undefined;
    }
  }

  save(): Observable<FilterSection> {
    const model: FilterSection = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.filterSectionId,
      filterId: this.filterId
    };

    return !!model.id ? this._filterSectionService.update(model) : this._filterSectionService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
