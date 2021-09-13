import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { FilterSectionPart, FilterSectionPartQuery } from '../models';

@Injectable()
export class FilterSectionPartService extends AbstractQueryableEntityService<FilterSectionPart, FilterSectionPartQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSectionPart`;
  }
}
