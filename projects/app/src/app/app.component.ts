import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Nullable } from '@core';
import { HeaderDefaultComponent, HeaderHostDirective, IHeaderConfig } from './features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  @ViewChild(HeaderHostDirective, { static: true })
  headerHost: Nullable<HeaderHostDirective>;

  title = 'CopeID';

  showHeader = true;
  showFooter = true;
  useContentContainer = true;

  headerComponent: Nullable<Component>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _factoryResolver: ComponentFactoryResolver,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._handleRouterEvent.bind(this));
  }

  ngAfterViewInit(): void {

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
    // TODO: Add support for layouts and footers.
    if (this.headerHost) {
      const headerConfig: IHeaderConfig = routeData.header;
      if (headerConfig?.component) {
        // TODO: Improve typings support to be more strict and remove usage of "any".
        const factory = this._factoryResolver.resolveComponentFactory(headerConfig.component as any);

        if (this.headerHost) {
          this.headerHost.viewContainerRef.clear();

          // TODO: Store component ref?
          const componentRef = this.headerHost.viewContainerRef.createComponent<HeaderDefaultComponent>(factory as any);
        }
      }
    }

    this.showHeader = routeData?.showHeader !== false;
    this.showFooter = routeData?.showFooter !== false;
    this.useContentContainer = routeData?.useContentContainer !== false;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
