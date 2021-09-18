import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Filter, FilterQuery, FinalFilterResult } from '../models';
import { FilterStepperResult } from '../../../pages/filter/components';

export interface FilterResultModel {
  filterId: string;
  results: FilterStepperResult[];
}

@Injectable()
export class FilterService extends AbstractQueryableEntityService<Filter, FilterQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Filter`;
  }

  public getSpecimenFilter(): Observable<Filter> {
    const endpoint = `${this._endpoint}/Specimen`;
    return this._http.get<Filter>(endpoint);
  }

  public getFilterResult(results: FilterResultModel): Observable<FinalFilterResult> {
    const endpoint = `${this._endpoint}/Result`;
    return this._http.post<FinalFilterResult>(endpoint, results)
  }
}
