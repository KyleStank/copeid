import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';

import { FilterModelProperty, FilterModelPropertyService, FilterModelService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filter-models-edit-properties',
  templateUrl: './admin-filter-models-edit-properties.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterModelService, FilterModelPropertyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsEditPropertiesComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterModelProperty | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _typesSubject = new BehaviorSubject<string[]>([]);
  readonly types$ = this._typesSubject.asObservable();

  readonly formGroup = this._fb.group({
    propertyName: ['', Validators.required]
  });

  filterModelId: string | undefined;
  filterModelPropertyId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterModelPropertyService: FilterModelPropertyService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.types$ = this.types$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            propertyName: result.propertyName
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.filterModelPropertyId = this._activatedRoute.snapshot.paramMap.get('filterModelPropertyId') ?? undefined;
    if (!!this.filterModelPropertyId) {
      this._filterModelPropertyService.getSingle(this.filterModelPropertyId).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this.filterModelId = this._activatedRoute.snapshot.parent?.paramMap.get('filterModelId') ?? undefined;
    if (!!this.filterModelId) {
      this._filterModelService.getPropertyTypes(this.filterModelId).pipe(
        map(results => results.sort((a, b) => a > b ? 1 : -1))
      ).subscribe(this._typesSubject.next.bind(this._typesSubject));
    }
  }

  save(): Observable<FilterModelProperty> {
    const model: FilterModelProperty = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.filterModelPropertyId,
      filterModelId: this.filterModelId
    };

    return !!model.id ? this._filterModelPropertyService.update(model) : this._filterModelPropertyService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
