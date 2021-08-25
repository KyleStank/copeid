import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { Specimen } from '../../specimen';
import { FilterData } from '../models';

@Injectable()
export class FilterService {
  constructor(private readonly _http: HttpClient) {}

  filter(filterData: FilterData) {
    return this._http.post<Specimen>(`${environment.apiUrl}/Filter`, filterData);
  }
}
