import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Contributor, ContributorService, Reference, ReferenceService } from '@app/features';
import { createFadeTrigger, createListTrigger, createSlideFadeUpTrigger } from '@shared/animations';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
  providers: [
    ContributorService,
    ReferenceService
  ],
  animations: [
    createListTrigger('pageAnimations', '@*'),
    createSlideFadeUpTrigger('slideFadeUp'),
    createFadeTrigger('fadeInOut')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferencesPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _contributorsSubject = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$ = this._contributorsSubject.asObservable();

  private readonly _referencesSubject = new BehaviorSubject<Reference[]>([]);
  readonly references$ = this._referencesSubject.asObservable();

  constructor(
    private readonly _contributorService: ContributorService,
    private readonly _referenceService: ReferenceService
  ) {
    this.contributors$ = this.contributors$.pipe(takeUntil(this._destroyed));
    this.references$ = this.references$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._contributorService.getAllEntities().subscribe(this._contributorsSubject.next.bind(this._contributorsSubject));
    this._referenceService.getAllEntities().subscribe(this._referencesSubject.next.bind(this._referencesSubject));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
