import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Reference, ReferenceService } from '@app/features';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
  providers: [ReferenceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferencesPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _referencesSubject = new BehaviorSubject<Reference[]>([]);
  readonly references$ = this._referencesSubject.asObservable();

  constructor(private readonly _referenceService: ReferenceService) {
    this.references$ = this.references$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._referenceService.getAllEntities().subscribe(this._referencesSubject.next.bind(this._referencesSubject));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
