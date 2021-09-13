import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Filter, FilterSection } from '../models';

@Injectable()
export class FilterService extends AbstractEntityService<Filter> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Filter`;
  }

  public getSections(id: string): Observable<FilterSection[]> {
    const endpoint = `${this._endpoint}/${id}/Sections`;
    return this._http.get<FilterSection[]>(endpoint);
  }
}
