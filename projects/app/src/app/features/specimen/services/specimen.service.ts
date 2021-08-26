import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Specimen, SpecimenQuery } from '../models';

@Injectable()
export class SpecimenService extends AbstractEntityService<Specimen, SpecimenQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Specimen`;
  }
}
