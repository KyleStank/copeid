import { ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';

import { AbstractComponentHostDirective } from '../directives';
import { ILayoutConfig } from '../models';

@Injectable()
export class LayoutBuilder {
  constructor(private readonly _factoryResolver: ComponentFactoryResolver) {}

  /**
   * Dynamically creates a component that will be rendered within a specified `AbstractComponentHostDirective`.
   *
   * @param host Target host directive where component will be rendered.
   * @param layoutConfig Layout configuration that will be applied during generation.
   * @returns Reference to dynamically created component.
   */
  generateLayout(host?: AbstractComponentHostDirective, layoutConfig?: ILayoutConfig): ComponentRef<any> | undefined {
    if (!host) return undefined;

    let componentRef: ComponentRef<any> | undefined;
    if (layoutConfig?.component && layoutConfig?.active !== false) {
      const factory = this._factoryResolver.resolveComponentFactory(layoutConfig.component);
      if (factory) {
        host.viewContainerRef.clear();
        componentRef = host.viewContainerRef.createComponent(factory);
        if (componentRef && layoutConfig.config) {
          Object.keys(layoutConfig.config).forEach(key =>
            (componentRef?.instance as any)[key] = layoutConfig.config[key]
          );
        }
      }
    }

    return componentRef;
  }
}
