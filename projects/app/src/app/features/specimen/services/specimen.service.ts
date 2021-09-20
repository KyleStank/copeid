import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Specimen, SpecimenQuery } from '../models';

@Injectable()
export class SpecimenService extends AbstractQueryableEntityService<Specimen, SpecimenQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Specimen`;
  }

  public getInfoSpecimens(): Observable<KeyValue<string, Specimen[]>[]> {
    const endpoint = `${this._endpoint}/Info`;
    return this._http.get<KeyValue<string, Specimen[]>[]>(endpoint);
  }
}
