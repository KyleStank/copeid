import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Photograph } from '../models';

@Injectable()
export class PhotographService extends AbstractEntityService<Photograph> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Photograph`;
  }
}
