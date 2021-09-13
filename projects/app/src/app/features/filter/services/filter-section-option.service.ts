import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { FilterSectionOption, FilterSectionOptionQuery } from '../models';

@Injectable()
export class FilterSectionOptionService extends AbstractQueryableEntityService<FilterSectionOption, FilterSectionOptionQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSectionOption`;
  }
}
