import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, mergeMap, Observable, Subject, takeUntil } from 'rxjs';

import { FilterModelProperty, FilterModelService, FilterSection, FilterSectionService, FilterService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-edit',
  templateUrl: './admin-filter-sections-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService, FilterModelService, FilterSectionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterSection | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _propertiesSubject = new BehaviorSubject<FilterModelProperty[]>([]);
  readonly properties$ = this._propertiesSubject.asObservable();

  private readonly _typesSubject = new BehaviorSubject<string[]>([]);
  readonly types$ = this._typesSubject.asObservable();

  readonly formGroup = this._fb.group({
    filterModelPropertyId: ['', Validators.required],
    displayName: ['', Validators.required],
    code: ['', Validators.required]
  });

  filterId: string | undefined;
  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterService: FilterService,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterSectionService: FilterSectionService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.properties$ = this.properties$.pipe(takeUntil(this.destroyed));
    this.types$ = this.types$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            filterModelPropertyId: result.filterModelPropertyId,
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

    if (!!this.filterId) {
      this._filterService.getSingle(this.filterId).pipe(
        mergeMap(result => this._filterModelService.getSingle(result.filterModelId!)),
        mergeMap(result => this._filterModelService.getProperties(result.id!))
      ).subscribe(this._propertiesSubject.next.bind(this._propertiesSubject));
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
