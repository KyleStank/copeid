import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterSection } from '../models';

@Injectable()
export class FilterSectionService extends AbstractEntityService<FilterSection> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSection`;
  }
}
