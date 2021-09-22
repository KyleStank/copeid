import { Directive, TemplateRef } from '@angular/core';

export class AutoDataCellOverrideDirectiveContext {
  constructor(
    public $implicit: any,
    public index: number,
    public rowIndex: number
  ) {}
}

@Directive({
  selector: '[autoDataCellOverride]'
})
export class AutoDataCellOverrideDirective {
  property: string | undefined;

  constructor(public readonly templateRef: TemplateRef<AutoDataCellOverrideDirectiveContext>) {}

  public initialize(property: string): void {
    this.property = property;
  }
}
