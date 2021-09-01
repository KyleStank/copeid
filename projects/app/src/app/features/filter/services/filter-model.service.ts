import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { FilterModel } from '../models';

@Injectable()
export class FilterModelService extends AbstractEntityService<FilterModel> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/FilterModel`;
  }

  public getTypes(): Observable<string[]> {
    const endpoint = `${this._endpoint}/Types`;
    return this._http.get<string[]>(endpoint);
  }
}
