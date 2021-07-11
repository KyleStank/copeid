import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-template-admin',
  templateUrl: './template-admin.component.html',
  styleUrls: ['./template-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateAdminComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  appName: string = 'Admin';
  pageName: string = 'Page';

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _media: MediaMatcher,
    private readonly _router: Router
  ) {
    this._router.events
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._handleRouterEvent.bind(this));

    this.mobileQuery = this._media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  /**
   * Handles each event that is fired by Angular's router.
   *
   * @param event Router event to handle.
   */
   private _handleRouterEvent(event: Event): void {
     if (event instanceof NavigationEnd) {
       console.log('Event:', event);
     }

    // const routeData = getSnapshotDataRecursive(this._route.snapshot) ?? {};
    // if (event instanceof NavigationEnd) {
    //   this._configureLayout(routeData);
    // }
  }

  ngOnDestroy(): void {
    if (this.mobileQuery.removeAllListeners) {
      this.mobileQuery.removeAllListeners();
    }
  }
}
