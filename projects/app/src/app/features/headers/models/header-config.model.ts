import { Component } from '@angular/core';

import { Nullable } from '@core';

// TODO: Do these need to be Nullable?
export interface IHeaderConfig {
  active: Nullable<boolean>;
  component: Nullable<Component>;
}
