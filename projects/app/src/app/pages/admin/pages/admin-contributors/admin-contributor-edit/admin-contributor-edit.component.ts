import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private readonly _modelSubject = new BehaviorSubject<Contributor | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _contributorService: ContributorService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this._destroyed));
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
}
