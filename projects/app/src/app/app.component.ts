import { Component, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Event, NavigationEnd, Router } from '@angular/router';
import { merge } from 'lodash-es';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ILayoutConfig, LayoutHostDirective, LayoutBuilder, TemplateDefaultComponent } from './features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LayoutBuilder]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  @ViewChild(LayoutHostDirective, { static: true })
  layoutHost?: LayoutHostDirective;
  layoutComponentRef?: ComponentRef<any>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _layoutBuilder: LayoutBuilder,
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
    const layoutConfig: ILayoutConfig = routeData.layout ?? { component: TemplateDefaultComponent };
    this.layoutComponentRef = this._layoutBuilder.generateLayout(this.layoutHost, layoutConfig);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
