import { Directive, TemplateRef } from '@angular/core';

export class AutoHeaderCellOverrideDirectiveContext {
  constructor(public $implicit: number) {}
}

@Directive({
  selector: '[autoHeaderCellOverride]'
})
export class AutoHeaderCellOverrideDirective {
  property: string | undefined;

  constructor(public readonly templateRef: TemplateRef<AutoHeaderCellOverrideDirectiveContext>) {}

  public initialize(property: string): void {
    this.property = property;
  }
}
