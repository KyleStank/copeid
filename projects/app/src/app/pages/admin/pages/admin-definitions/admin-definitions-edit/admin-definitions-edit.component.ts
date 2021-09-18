import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Definition, DefinitionService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-definitions-edit',
  templateUrl: './admin-definitions-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DefinitionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Definition | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  get valid(): boolean { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    name: ['', Validators.required],
    meaning: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _definitionService: DefinitionService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            name: result.name,
            meaning: result.meaning
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
      this._definitionService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }
  }

  save(): Observable<Definition> {
    const model: Definition = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._definitionService.update(model) : this._definitionService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
