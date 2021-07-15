import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { KeyboardService, KeyCode } from '@stankng/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-template-admin',
  templateUrl: './template-admin.component.html',
  styleUrls: ['./template-admin.component.scss'],
  providers: [KeyboardService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateAdminComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  @ViewChild('sidenav', { static: true, read: MatSidenav })
  sidenav: MatSidenav | undefined;

  @Input()
  appName: string = 'Admin';

  @Input()
  pageName: string = 'Page';

  @Input()
  menu: { label: string; url?: string; logo?: string; }[] = [];

  private readonly _mobileWidth = '600px';
  isMobile = false;

  constructor(
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _detectorRef: ChangeDetectorRef,
    private readonly _keyboardService: KeyboardService
  ) {
    this._breakpointObserver.observe(`(max-width: ${this._mobileWidth})`)
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._checkMobileBreakpoint.bind(this));

    this._registerKeyboardShorts();
  }

  /**
   * Toggles mobile sidenav based on whether the mobile breakpoint is matched.
   **/
  private _checkMobileBreakpoint(state: BreakpointState): void {
    this.isMobile = state.matches;
    this._detectorRef.markForCheck();
  }

  /**
   * Creates keyboard shortcuts for actions sidenav.
   */
  private _registerKeyboardShorts(): void {
    // Commands:
    //  - Toggle_Sidenav
    const toggleSidenavFn = () => {
      this.sidenav?.toggle();
      this._detectorRef.markForCheck();
    };

    // Toggle_Sidenav
    this._keyboardService.shortcut$([KeyCode.LeftControl, KeyCode.B])
      .pipe(takeUntil(this._destroyed))
      .subscribe(toggleSidenavFn.bind(this));

    this._keyboardService.shortcut$([KeyCode.RightControl, KeyCode.B])
      .pipe(takeUntil(this._destroyed))
      .subscribe(toggleSidenavFn.bind(this));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
