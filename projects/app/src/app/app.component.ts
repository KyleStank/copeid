import { Component, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getSnapshotDataRecursive } from '@shared';
import { ILayoutConfig, LayoutHostDirective, LayoutBuilder, TemplateDefaultComponent } from './features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
    const routeData = getSnapshotDataRecursive(this._route.snapshot) ?? {};
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
    const layoutConfig: ILayoutConfig = routeData.layout ?? { component: TemplateDefaultComponent };
    this.layoutComponentRef = this._layoutBuilder.generateLayout(this.layoutHost, layoutConfig);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
