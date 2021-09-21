import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, mergeMap, Observable, Subject, takeUntil } from 'rxjs';

import { File, FileService } from '@app/features';
import { IAdminEditView } from '../../../components';
import { convertFile } from '@shared/utils';

@Component({
  selector: 'app-admin-files-edit',
  templateUrl: './admin-files-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FileService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilesEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<File | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  get valid(): boolean { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    name: ['', Validators.required],
    data: [null, Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fileService: FileService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            name: result.name
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
      this._fileService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }
  }

  save(): Observable<File> {
    const file: globalThis.File = this.formGroup.get('data')!.value;
    console.log(file);
    return convertFile(file).pipe(
      map(data => new File({
        ...(this._modelSubject.value ?? {}),
        ...this.formGroup.value,
        id: this.id,
        path: this._modelSubject.value?.path ?? 'worthless_value_that_is_overwritten_on_server', // TODO: Adjust models to NOT require path.
        data
      })),
      mergeMap(model => !!model.id ? this._fileService.update(model) : this._fileService.create(model))
    );
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
