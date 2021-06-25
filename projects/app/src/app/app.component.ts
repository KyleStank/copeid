import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  title = 'CopeID';

  showHeader = true;
  showFooter = true;
  useContentContainer = true;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._handleRouterEvent.bind(this));
  }

  /**
   * Handles each event that is fired by Angular's router.
   *
   * @param event Router event to handle.
   */
  private _handleRouterEvent(event: Event): void {
    const routeData = this._route.firstChild?.snapshot?.data || {};
    if (event instanceof NavigationEnd) {
      this._configureLayout(routeData);
    }
  }

  /**
   * Configures the page's layout based on provided route-level data.
   *
   * @param routeData Data retrieved from the route.
   */
  private _configureLayout(routeData: any): void {
    this.showHeader = routeData?.showHeader !== false;
    this.showFooter = routeData?.showFooter !== false;
    this.useContentContainer = routeData?.useContentContainer !== false;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
