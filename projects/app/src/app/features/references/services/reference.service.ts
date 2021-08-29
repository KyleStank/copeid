import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Reference, ReferenceQuery } from '../models';

@Injectable()
export class ReferenceService extends AbstractQueryableEntityService<Reference, ReferenceQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Reference`;
  }
}
