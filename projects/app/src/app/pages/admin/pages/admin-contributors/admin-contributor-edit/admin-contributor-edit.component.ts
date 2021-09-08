import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Contributor, ContributorService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-contributor-edit',
  templateUrl: './admin-contributor-edit.component.html',
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorEditComponent implements IAdminEditView<Contributor>, OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Contributor | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  readonly formGroup = this._fb.group({
    name: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _contributorService: ContributorService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this._destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            name: result.name
          });
          this.formGroup.markAllAsTouched();
          this._changeDetectorRef.markForCheck();
        }
      }
    });
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this.getEntity(this.id);
    }
  }

  getEntity(id: string): void {
    this._contributorService.getSingle(id).subscribe(this._modelSubject.next.bind(this._modelSubject));
  }

  save(): Observable<Contributor> {
    const model: Contributor = {
      ...this.formGroup.value,
      id: this.id
    };

    return this._contributorService.update(model);
  }

  updateModelTitle(): string | undefined {
    return this._modelSubject.value?.name ?? undefined;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
