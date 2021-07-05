import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Specimen } from '../models';

@Injectable()
export class SpecimenService extends AbstractEntityService<Specimen> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Specimen`;
  }
}
