import { Type } from '@angular/core';

import { ILayoutTemplate } from './layout-template.model';

export interface ILayoutConfig<TLayoutTemplate extends ILayoutTemplate = ILayoutTemplate> {
  active?: boolean;
  component?: Type<TLayoutTemplate>;
  config?: any;
}
