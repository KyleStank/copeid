import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Contributor, ContributorQuery } from '../models';

@Injectable()
export class ContributorService extends AbstractQueryableEntityService<Contributor, ContributorQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Contributor`;
  }
}
