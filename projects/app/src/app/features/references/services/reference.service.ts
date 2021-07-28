import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Reference } from '../models';

@Injectable()
export class ReferenceService extends AbstractEntityService<Reference> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Reference`;
  }
}
