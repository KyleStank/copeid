import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterModel } from '../models';

@Injectable()
export class FilterModelService extends AbstractEntityService<FilterModel> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterModel`;
  }
}
