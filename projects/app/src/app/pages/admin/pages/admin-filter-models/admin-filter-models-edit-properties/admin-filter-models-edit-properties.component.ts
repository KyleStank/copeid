import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilterModel, FilterModelProperty, FilterModelService } from '@app/features';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-filter-models-edit-properties',
  templateUrl: './admin-filter-models-edit-properties.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterModelService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsEditPropertiesComponent {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<FilterModelProperty[]>([]);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _typesSubject = new BehaviorSubject<string[]>([]);
  readonly types$ = this._typesSubject.asObservable();

  readonly formGroup = this._fb.group({
    typeName: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterModelService: FilterModelService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          // this.formGroup.patchValue({
          //   typeName: result.typeName
          // });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._filterModelService.getProperties(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._filterModelService.getTypes().subscribe(this._typesSubject.next.bind(this._typesSubject));
  }

  save(): Observable<FilterModel> {
    const model: FilterModel = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._filterModelService.update(model) : this._filterModelService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
