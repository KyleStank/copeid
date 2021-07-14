import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChildActivationStart } from '@angular/router';
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

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private readonly _detectorRef: ChangeDetectorRef,
    private readonly _keyboardService: KeyboardService,
    private readonly _media: MediaMatcher
  ) {
    // Setup mobile query listener.
    this.mobileQuery = this._media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this._detectorRef.markForCheck();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    this._registerKeyboardShorts();
  }

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
    if (this.mobileQuery.removeAllListeners) {
      this.mobileQuery.removeAllListeners();
    }

    this._destroyed.next();
    this._destroyed.complete();
  }
}
