import { ComponentFactoryResolver, Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

import { FilterSection, FilterSectionPart, FilterSectionPartOption } from '@app/features';
import { FilterStepContainerComponent } from './filter-step-container.component';

export class FilterStepOptionDefinitionContext {
  $implicit: FilterSectionPartOption;

  constructor($implicit: FilterSectionPartOption) {
    this.$implicit = $implicit;
  }
}

@Directive({
  selector: '[filterStepOptionDef]'
})
export class FilterStepOptionDefinitionDirective {
  constructor(readonly templateRef: TemplateRef<FilterStepOptionDefinitionContext>) {}
}

@Directive({
  selector: '[filterStepPartOutlet]'
})
export class FilterStepPartOutletDirective implements OnChanges {
  @Input('filterStepPartOutlet')
  part?: FilterSectionPart;

  @Input('filterStepPartOutletOptionDef')
  optionDef?: FilterStepOptionDefinitionDirective;

  constructor(readonly viewContainerRef: ViewContainerRef) {}

  ngOnChanges(): void {
    if (!!this.part && !!this.optionDef) this.render();
  }

  render(): void {
    this.viewContainerRef.clear();

    const options = this.part!.filterSectionPartOptions ?? [];
    options.forEach(option => this.viewContainerRef.createEmbeddedView(
      this.optionDef!.templateRef,
      new FilterStepOptionDefinitionContext(option)
    ));
  }
}

@Directive({
  selector: '[filterStepOutlet]'
})
export class FilterStepOutletDirective implements OnChanges {
  @Input('filterStepOutlet')
  section?: FilterSection;

  @Input('filterStepOutletOptionDef')
  optionDef?: FilterStepOptionDefinitionDirective;

  constructor(
    readonly componentFactoryResolver: ComponentFactoryResolver,
    readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(): void {
    if (!!this.section && !!this.optionDef) {
      this.viewContainerRef.clear();

      const parts = this.section.filterSectionParts ?? [];
      if (parts.length <= 1) { // Render option without container.
        const partOutlet = new FilterStepPartOutletDirective(this.viewContainerRef);
        partOutlet.part = parts[0];
        partOutlet.optionDef = this.optionDef;
        partOutlet.render();
      } else { // Render options with container.
        const factory = this.componentFactoryResolver.resolveComponentFactory(FilterStepContainerComponent);
        const componentRef = this.viewContainerRef.createComponent(factory);
        componentRef.instance.section = this.section;
        componentRef.instance.optionDef = this.optionDef;
        componentRef.changeDetectorRef.markForCheck();
      }
    }
  }
}
