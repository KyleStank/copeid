import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, mergeMap, Observable, Subject, takeUntil } from 'rxjs';

import { FilterModelProperty, FilterModelService, FilterSectionPart, FilterSectionPartService, FilterService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-parts-edit',
  templateUrl: './admin-filter-sections-parts-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService, FilterModelService, FilterSectionPartService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsPartsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterSectionPart | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _propertiesSubject = new BehaviorSubject<FilterModelProperty[]>([]);
  readonly properties$ = this._propertiesSubject.asObservable();

  readonly formGroup = this._fb.group({
    filterModelPropertyId: ['', Validators.required],
    displayName: ['', Validators.required]
  });

  filterSectionPartId: string | undefined;
  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterService: FilterService,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterSectionPartService: FilterSectionPartService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.properties$ = this.properties$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            filterModelPropertyId: result.filterModelPropertyId,
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

    const filterId = this._activatedRoute.snapshot.parent?.paramMap.get('filterId') ?? undefined;
    if (!!filterId) {
      this._filterService.getSingle(filterId).pipe(
        mergeMap(result => this._filterModelService.getSingle(result.filterModelId!)),
        mergeMap(result => this._filterModelService.getProperties(result.id!)),
        map(results => results.sort((a, b) => a.propertyName! > b.propertyName! ? 1 : -1))
      ).subscribe(this._propertiesSubject.next.bind(this._propertiesSubject));
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
