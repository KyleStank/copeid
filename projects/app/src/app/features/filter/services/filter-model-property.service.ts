import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterModelProperty } from '../models';

@Injectable()
export class FilterModelPropertyService extends AbstractEntityService<FilterModelProperty> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterModelProperty`;
  }
}
