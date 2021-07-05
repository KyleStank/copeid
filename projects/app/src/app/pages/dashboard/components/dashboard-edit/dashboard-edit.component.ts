import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Genus, GenusService } from '@app/features';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GenusService]
})
export class DashboardEditPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _genuses = new BehaviorSubject<Genus[]>([]);
  readonly genuses$: Observable<Genus[]>;

  constructor(private readonly _genusService: GenusService) {
    this.genuses$ = this._genuses.asObservable()
      .pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._genusService.getAllEntities().subscribe(this._genuses.next.bind(this._genuses));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
