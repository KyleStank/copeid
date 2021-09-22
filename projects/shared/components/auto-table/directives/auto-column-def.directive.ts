import {
  AfterContentInit,
  ContentChild,
  Directive,
  Input,
  OnInit
} from '@angular/core';

import { AutoDataCellOverrideDirective } from './auto-data-cell-override.directive';
import { AutoHeaderCellOverrideDirective } from './auto-header-cell-override.directive';

@Directive({
  selector: '[autoColumnDef]'
})
export class AutoColumnDefDirective implements OnInit, AfterContentInit {
  @ContentChild(AutoDataCellOverrideDirective, { static: true })
  public dataCellOverride: AutoDataCellOverrideDirective | undefined;

  @ContentChild(AutoHeaderCellOverrideDirective, { static: true })
  public headerCellOverride: AutoHeaderCellOverrideDirective | undefined;

  @Input('autoColumnDef')
  public property = '';

  @Input()
  public header: string | undefined;

  @Input()
  public default: string | undefined;

  @Input()
  public sortable = true;

  ngOnInit(): void {
    // If no header text was provided, convert the property name into a useable header.
    if (this.header == null) {
      this.header = ''; // Set to empty string. Without this, 'null' will be appended below.

      const properties = this.property.split('.');
      this.header += properties.length > 0 ?
        properties.map(x => this._capitalizeCamelCase(x)).join('') :
        this._capitalizeCamelCase(this.property);

      this.header = this.header.substr(0, this.header.length - 1); // Remove the empty space at the end of string.
    }
  }

  ngAfterContentInit(): void {
    this.dataCellOverride?.initialize(this.property);
    this.headerCellOverride?.initialize(this.property);
  }

  private _capitalizeCamelCase(str: string): string {
    let result = '';
    result += this._splitCamelCase(str).map(x => `${x} `).join(''); // Include space at end to seperate each string.
    return result;
  }

  private _splitCamelCase(str: string): string[] {
    const splitStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    const strArr = splitStr.split(' ');
    for (let i = 0; i < strArr.length; i++) {
      strArr[i] = strArr[i].substr(0, 1).toUpperCase() + strArr[i].substr(1);
    }
    return strArr;
  }
}
