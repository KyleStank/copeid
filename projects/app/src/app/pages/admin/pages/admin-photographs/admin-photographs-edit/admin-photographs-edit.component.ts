import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Photograph, PhotographService } from '@app/features';

@Component({
  selector: 'app-admin-photographs-edit',
  templateUrl: './admin-photographs-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [PhotographService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsEditComponent {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Photograph | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  readonly formGroup = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    alt: [''],
    url: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _photographService: PhotographService,
    private readonly _fb: FormBuilder
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            title: result.title,
            description: result.description,
            alt: result.alt,
            url: result.url
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
      this._photographService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }
  }

  save(): Observable<Photograph> {
    const model: Photograph = {
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._photographService.update(model) : this._photographService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}