import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Filter, FilterQuery } from '../models';

@Injectable()
export class FilterService extends AbstractQueryableEntityService<Filter, FilterQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Filter`;
  }

  public getSpecimenFilter(): Observable<Filter> {
    const endpoint = `${this._endpoint}/Specimen`;
    return this._http.get<Filter>(endpoint);
  }
}
