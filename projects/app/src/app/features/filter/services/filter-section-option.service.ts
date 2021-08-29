import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterSectionOption } from '../models';

@Injectable()
export class FilterSectionOptionService extends AbstractEntityService<FilterSectionOption> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSectionOption`;
  }
}
