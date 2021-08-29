import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Filter } from '../models';

@Injectable()
export class FilterService extends AbstractEntityService<Filter> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Filter`;
  }
}
