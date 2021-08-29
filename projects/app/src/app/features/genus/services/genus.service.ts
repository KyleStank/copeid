import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Genus, GenusQuery } from '../models';

@Injectable()
export class GenusService extends AbstractQueryableEntityService<Genus, GenusQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Genus`;
  }
}
