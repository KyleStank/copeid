import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ILayoutTemplate } from '@core/layouts/models';

@Component({
  selector: 'app-template-default',
  templateUrl: './template-default.component.html',
  styleUrls: ['./template-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDefaultComponent implements ILayoutTemplate, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  @ViewChild('sidenav', { static: true, read: MatSidenav })
  sidenav?: MatSidenav;

  @Input()
  appName: string = 'AppName';

  @Input()
  pageName: string = 'Page';

  @Input()
  menu: { label: string; url?: string; logo?: string; }[] = [];

  private readonly _mobileWidth = '600px';
  isMobile = false;

  constructor(
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _detectorRef: ChangeDetectorRef
  ) {
    this._breakpointObserver.observe(`(max-width: ${this._mobileWidth})`)
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._checkMobileBreakpoint.bind(this));
  }

  /**
   * Toggles mobile sidenav based on whether the mobile breakpoint is matched.
   */
  private _checkMobileBreakpoint(state: BreakpointState): void {
    this.isMobile = state.matches;
    this._detectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  resetLayout(): void {
    this.appName = 'AppName';
    this.pageName = 'Page';
    this.menu = [];
  }
}
