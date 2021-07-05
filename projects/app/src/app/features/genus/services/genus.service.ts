import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Genus } from '../models';

@Injectable()
export class GenusService extends AbstractEntityService<Genus> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Genus`;
  }
}
