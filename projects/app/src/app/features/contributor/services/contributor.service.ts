import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Contributor, ContributorQuery } from '../models';

@Injectable()
export class ContributorService extends AbstractEntityService<Contributor, ContributorQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Contributor`;
  }
}
