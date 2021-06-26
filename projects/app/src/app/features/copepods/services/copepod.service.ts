import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Copepod } from '../models';

@Injectable()
export class CopepodService {
  private readonly _baseEndpoint = environment.apiUrl;

  private readonly _endpoint = this._baseEndpoint + '/Copepod';

  constructor(private readonly _http: HttpClient) {}

  getAllCopepods(): Observable<Copepod[]> {
    return this._http.get<Copepod[]>(`${this._endpoint}`);
  }

  getCopepod(id: string): Observable<Copepod> {
    return this._http.get<Copepod>(`${this._endpoint}/${id}`);
  }
}
