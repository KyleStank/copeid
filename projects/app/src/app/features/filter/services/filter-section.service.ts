import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { FilterSection, FilterSectionOption, FilterSectionQuery } from '../models';

@Injectable()
export class FilterSectionService extends AbstractQueryableEntityService<FilterSection, FilterSectionQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSection`;
  }

  public getOptions(id: string): Observable<FilterSectionOption[]> {
    const endpoint = `${this._endpoint}/${id}/Options`;
    return this._http.get<FilterSectionOption[]>(endpoint);
  }
}
