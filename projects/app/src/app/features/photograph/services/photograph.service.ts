import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Photograph, PhotographQuery } from '../models';

@Injectable()
export class PhotographService extends AbstractEntityService<Photograph, PhotographQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Photograph`;
  }
}
