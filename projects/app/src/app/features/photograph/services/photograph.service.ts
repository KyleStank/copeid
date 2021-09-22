import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Photograph, PhotographQuery } from '../models';

@Injectable()
export class PhotographService extends AbstractQueryableEntityService<Photograph, PhotographQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Photograph`;
  }
}
