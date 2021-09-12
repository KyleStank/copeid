import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Filter, FilterModel, FilterModelService, FilterService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filters-edit',
  templateUrl: './admin-filters-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService, FilterModelService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Filter | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _filterModelsSubject = new BehaviorSubject<FilterModel[]>([]);
  readonly filterModels$ = this._filterModelsSubject.asObservable();

  readonly formGroup = this._fb.group({
    filterModelId: [null, Validators.required],
    displayName: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterService: FilterService,
    private readonly _filterModelService: FilterModelService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            filterModelId: result.filterModelId,
            displayName: result.displayName
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._filterService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._filterModelService.getAll().subscribe(this._filterModelsSubject.next.bind(this._filterModelsSubject));
  }

  save(): Observable<Filter> {
    const model: Filter = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._filterService.update(model) : this._filterService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
