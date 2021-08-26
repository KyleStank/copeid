import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Genus, GenusQuery } from '../models';

@Injectable()
export class GenusService extends AbstractEntityService<Genus, GenusQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Genus`;
  }
}
