import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { FilterSectionPartOption, FilterSectionPartOptionQuery } from '../models';

@Injectable()
export class FilterSectionPartOptionService extends AbstractQueryableEntityService<FilterSectionPartOption, FilterSectionPartOptionQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSectionPartOption`;
  }
}
