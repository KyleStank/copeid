import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Event, NavigationEnd, Router } from '@angular/router';
import { merge } from 'lodash-es';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Nullable } from '@core';
import { AbstractComponentHostDirective, HeaderHostDirective, ILayoutConfig } from './features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
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

  /**
   * Handles each event that is fired by Angular's router.
   *
   * @param event Router event to handle.
   */
  private _handleRouterEvent(event: Event): void {
    const routeData = this._getSnapshotDataRecursive(this._route.snapshot) ?? {};
    if (event instanceof NavigationEnd) {
      this._configureLayout(routeData);
    }
  }

  /**
   * Takes a root snapshot's route data and then recursively traverses the children of the snapshot.
   * Merges each child snapshot data into one final data object.
   *
   * @param snapshot Root snapshot to traverse.
   * @param data Data object. Generally should be left blank.
   * @returns Merged data object containing all route data.
   */
  private _getSnapshotDataRecursive(snapshot: ActivatedRouteSnapshot, data: any = {}): any {
    data = merge(data, snapshot.data);
    snapshot.children.forEach(c => data = this._getSnapshotDataRecursive(c, data));
    return data;
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
        this.headerComponentRef = this._createHostComponent<typeof headerConfig.component>(this.headerHost, headerConfig.component);
        if (this.headerComponentRef && headerConfig.config) {
          Object.keys(headerConfig.config).forEach(key => (this.headerComponentRef?.instance as any)[key] = headerConfig.config[key]);
        }
      }
    }

    this.showFooter = routeData?.showFooter !== false;
    this.useContentContainer = routeData?.useContentContainer !== false;
  }

  /**
   * Dynamically creates a component that will be rendered within a specified `AbstractComponentHostDirective`.
   *
   * @param host Target host directive where component will be rendered.
   * @param component Component to create.
   * @returns Reference to created component.
   */
  private _createHostComponent<TComponent = any>(host?: AbstractComponentHostDirective, component?: Type<TComponent>): Nullable<ComponentRef<TComponent>> {
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
