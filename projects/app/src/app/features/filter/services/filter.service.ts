import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Filter, FilterQuery } from '../models';

@Injectable()
export class FilterService extends AbstractQueryableEntityService<Filter, FilterQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Filter`;
  }
}
