import { ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';

import { AbstractComponentHostDirective } from '../directives';
import { ILayoutConfig, ILayoutTemplate } from '../models';

@Injectable({ providedIn: 'root' })
export class LayoutBuilder {
  constructor(private readonly _factoryResolver: ComponentFactoryResolver) {}

  /**
   * Dynamically creates a component that will be rendered within a specified `AbstractComponentHostDirective`.
   *
   * @param host Target host directive where component will be rendered.
   * @param layoutConfig Layout configuration that will be applied during generation.
   * @returns Reference to dynamically created component.
   */
  generateLayout(host?: AbstractComponentHostDirective, layoutConfig?: ILayoutConfig): ComponentRef<ILayoutTemplate> | undefined {
    if (!host) return undefined;

    let componentRef: ComponentRef<ILayoutTemplate> | undefined;
    if (layoutConfig?.component && layoutConfig?.active !== false) {
      const factory = this._factoryResolver.resolveComponentFactory(layoutConfig.component);
      if (factory) {
        host.viewContainerRef.clear();
        componentRef = host.viewContainerRef.createComponent(factory);
        if (componentRef) {
          if (layoutConfig.config) {
            componentRef = this.refreshLayout(componentRef, layoutConfig);
          }

          componentRef!.changeDetectorRef.markForCheck();
        }
      }
    }

    return componentRef;
  }

  /**
   * Updates the layout configuration of a dynamically created component.
   *
   * @param componentRef Component instance to update.
   * @param layoutConfig Layout configuration to apply.
   * @returns Reference to the updated component.
   */
  refreshLayout(componentRef: ComponentRef<ILayoutTemplate>, layoutConfig?: ILayoutConfig, reset?: boolean): ComponentRef<ILayoutTemplate> | undefined {
    if (!componentRef) return undefined;
    if (!layoutConfig || !layoutConfig?.config) return componentRef;

    if (reset) {
      componentRef.instance.resetLayout();
    }

    Object.keys(layoutConfig.config).forEach(key =>
      (componentRef?.instance as any)[key] = layoutConfig.config[key]
    );

    return componentRef;
  }
}
