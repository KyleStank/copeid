import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';

import { FilterModel, FilterModelService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-filter-models-edit',
  templateUrl: './admin-filter-models-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterModelService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterModel | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _typesSubject = new BehaviorSubject<string[]>([]);
  readonly types$ = this._typesSubject.asObservable();

  readonly formGroup = this._fb.group({
    typeName: ['', Validators.required]
  });

  filterModelid: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterModelService: FilterModelService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.types$ = this.types$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            typeName: result.typeName
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.filterModelid = this._activatedRoute.snapshot.paramMap.get('filterModelId') ?? undefined;
    if (!!this.filterModelid) {
      this._filterModelService.getSingle(this.filterModelid).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._filterModelService.getTypes().pipe(
      map(results => results.sort((a, b) => a > b ? 1 : -1))
    ).subscribe(this._typesSubject.next.bind(this._typesSubject));
  }

  save(): Observable<FilterModel> {
    const model: FilterModel = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.filterModelid
    };

    return !!model.id ? this._filterModelService.update(model) : this._filterModelService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
