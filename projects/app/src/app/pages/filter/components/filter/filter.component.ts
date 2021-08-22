import { ChangeDetectionStrategy, Component, ComponentRef, OnInit, Type, ViewChild } from '@angular/core';

import { ILayoutConfig, LayoutBuilder, LayoutHostDirective } from '@app/features';
import { IFilterSection } from '../../models';
import { FilterLengthSectionComponent } from '../../sections';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit {
  @ViewChild(LayoutHostDirective, { static: true })
  layoutHost?: LayoutHostDirective;
  layoutComponentRef?: ComponentRef<IFilterSection>;

  constructor(private readonly _layoutBuilder: LayoutBuilder) {}

  ngOnInit(): void {
    this._generateSection(FilterLengthSectionComponent);
  }

  private _generateSection(sectionComponent: Type<IFilterSection>, config?: any) {
    const layoutConfig: ILayoutConfig = {
      component: sectionComponent,
      config
    };
    this.layoutComponentRef = this._layoutBuilder.generateLayout(this.layoutHost, layoutConfig);
  }
}
