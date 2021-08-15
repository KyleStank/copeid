import { Type } from '@angular/core';

import { ILayoutTemplate } from './layout-template.model';

export interface ILayoutConfig {
  active?: boolean;
  component?: Type<ILayoutTemplate>;
  config?: any;
}
