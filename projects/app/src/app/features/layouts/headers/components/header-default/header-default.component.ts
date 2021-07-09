import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDefaultComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _menuClick = new Subject<MouseEvent>();
  readonly menuClick$: Observable<MouseEvent>;

  @Input()
  text: string | undefined;

  @Input()
  color: string | undefined;

  constructor() {
    this.menuClick$ = this._menuClick.asObservable()
      .pipe(takeUntil(this._destroyed));
  }

  menuClick(event: MouseEvent): void {
    this._menuClick.next(event);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
