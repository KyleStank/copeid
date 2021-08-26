import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Reference, ReferenceQuery } from '../models';

@Injectable()
export class ReferenceService extends AbstractEntityService<Reference, ReferenceQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Reference`;
  }
}
