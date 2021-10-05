import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

import { AdminDataTableMenuDirective } from './admin-data-table-menu.directive';

export class AdminDataTableMenuOutletContext {
  constructor(
    public $implicit: AdminDataTableMenuDirective
  ) {}
}

@Directive({
  selector: '[adminDataTableMenuOutlet]'
})
export class AdminDataTableMenuOutletDirective implements OnInit {
  @Input('adminDataTableMenuOutlet')
  adminMenuDirective?: AdminDataTableMenuDirective;

  @Input('adminDataTableMenuOutletCell')
  outletCell?: any;

  constructor(readonly viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainerRef.clear();

    if (!!this.adminMenuDirective && !!this.outletCell) {
      this.adminMenuDirective.render(this.viewContainerRef, this.outletCell);
    }
  }
}
