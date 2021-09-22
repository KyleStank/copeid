import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Specimen, SpecimenQuery } from '../models';

@Injectable()
export class SpecimenService extends AbstractQueryableEntityService<Specimen, SpecimenQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Specimen`;
  }
}
