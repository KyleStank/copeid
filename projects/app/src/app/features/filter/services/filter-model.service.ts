import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterModel, FilterModelProperty } from '../models';

@Injectable()
export class FilterModelService extends AbstractEntityService<FilterModel> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterModel`;
  }

  public getTypes(): Observable<string[]> {
    const endpoint = `${this._endpoint}/Types`;
    return this._http.get<string[]>(endpoint);
  }

  public getProperties(id: string): Observable<FilterModelProperty[]> {
    const endpoint = `${this._endpoint}/${id}/Properties`;
    return this._http.get<FilterModelProperty[]>(endpoint);
  }

  public getPropertyTypes(id: string): Observable<string[]> {
    const endpoint = `${this._endpoint}/${id}/PropertyTypes`;
    return this._http.get<string[]>(endpoint);
  }
}
