import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterSection, FilterSectionOption } from '../models';

@Injectable()
export class FilterSectionService extends AbstractEntityService<FilterSection> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterSection`;
  }

  public getOptions(id: string): Observable<FilterSectionOption[]> {
    const endpoint = `${this._endpoint}/${id}/Options`;
    return this._http.get<FilterSectionOption[]>(endpoint);
  }
}
