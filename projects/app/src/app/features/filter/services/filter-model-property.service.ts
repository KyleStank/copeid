import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { FilterModelProperty, FilterModelPropertyQuery } from '../models';

@Injectable()
export class FilterModelPropertyService extends AbstractQueryableEntityService<FilterModelProperty, FilterModelPropertyQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterModelProperty`;
  }
}
