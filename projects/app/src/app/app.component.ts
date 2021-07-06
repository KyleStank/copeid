import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Nullable } from '@core';
import { AbstractComponentHostDirective, HeaderHostDirective, ILayoutConfig } from './features';

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

  showFooter = true;
  useContentContainer = true;

  headerComponentRef: Nullable<ComponentRef<any>>;

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
      const headerConfig: ILayoutConfig = routeData.header;
      if (headerConfig?.active !== false) {
        this.headerComponentRef = this._createDynamicComponent<typeof headerConfig.component>(this.headerHost, headerConfig.component);
        if (this.headerComponentRef && headerConfig.data) {
          Object.keys(headerConfig.data).forEach(key => (this.headerComponentRef?.instance as any)[key] = headerConfig.data[key]);
        }
      }
    }

    this.showFooter = routeData?.showFooter !== false;
    this.useContentContainer = routeData?.useContentContainer !== false;
  }

  private _createDynamicComponent<TComponent = any>(host?: AbstractComponentHostDirective, component?: Type<TComponent>): Nullable<ComponentRef<TComponent>> {
    let componentRef: Nullable<ComponentRef<TComponent>>;

    if (component) {
      const factory = this._factoryResolver.resolveComponentFactory(component);
      if (host && factory) {
        host.viewContainerRef.clear();
        componentRef = host.viewContainerRef.createComponent(factory);
      }
    }

    return componentRef;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
