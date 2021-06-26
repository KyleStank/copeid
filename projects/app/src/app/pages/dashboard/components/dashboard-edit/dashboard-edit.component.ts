import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Copepod, CopepodService } from '@app/features';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CopepodService]
})
export class DashboardEditPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _copepods = new BehaviorSubject<Copepod[]>([]);
  readonly copepods$: Observable<Copepod[]>;

  constructor(private readonly _copepodService: CopepodService) {
    this.copepods$ = this._copepods.asObservable()
      .pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._copepodService.getAllCopepods().subscribe(this._copepods.next.bind(this._copepods));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
