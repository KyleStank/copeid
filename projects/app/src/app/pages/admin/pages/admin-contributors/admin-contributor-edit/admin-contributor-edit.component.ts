import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Contributor, ContributorService } from '@app/features';

@Component({
  selector: 'app-admin-contributor-edit',
  templateUrl: './admin-contributor-edit.component.html',
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorEditComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Partial<Contributor> | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  readonly formGroup = this._fb.group({
    name: ['', Validators.required]
  });
  get nameControl(): AbstractControl {
    return this.formGroup.get('name')!;
  }

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _contributorService: ContributorService,
    private readonly _fb: FormBuilder,
    private readonly _router: Router
  ) {
    this.model$ = this.model$.pipe(takeUntil(this._destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result?.name) {
          this.nameControl.setValue(result.name, { emitEvent: false });
          this.nameControl.markAsTouched();
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

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  getEntity(id: string): void {
    this._contributorService.getSingle(id).subscribe(this._modelSubject.next.bind(this._modelSubject));
  }

  save(): void {
    const model: Contributor = {
      id: this.id,
      name: this.nameControl.value
    };

    this._contributorService.update(model).subscribe({
      next: () => this.cancel(),
      error: error => console.error('Error:', error)
    });
  }

  cancel(): void {
    this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
  }
}
