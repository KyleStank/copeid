import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Photograph, PhotographQuery } from '../models';

@Injectable()
export class PhotographService extends AbstractEntityService<Photograph, PhotographQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Photograph`;
  }
}
