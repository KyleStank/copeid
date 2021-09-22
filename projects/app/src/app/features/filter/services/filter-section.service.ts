import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { FilterSection, FilterSectionQuery } from '../models';

@Injectable()
export class FilterSectionService extends AbstractQueryableEntityService<FilterSection, FilterSectionQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSection`;
  }
}
