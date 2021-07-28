import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IEntity } from '../models';

@Injectable()
export abstract class AbstractEntityService<TEntity = IEntity, TId = string> {
  protected readonly _endpoint: string;

  constructor(protected readonly _http: HttpClient) {
    this._endpoint = this.getEndpoint();
  }

  public abstract getEndpoint(): string;

  public getAllEntities(include?: string[]): Observable<TEntity[]> {
    const endpoint = this._endpoint;
    return this._http.get<TEntity[]>(include ?
      this._createParamsEndpoint(
        endpoint,
        include.map(x => ({ key: 'include', value: x }))
      ) : endpoint
    );
  }

  public getEntity(id: TId, include?: string[]): Observable<TEntity> {
    const endpoint = `${this._endpoint}/${id}`;
    return this._http.get<TEntity>(include ?
      this._createParamsEndpoint(
        endpoint,
        include.map(x => ({ key: 'include', value: x }))
      ) : endpoint
    );
  }

  public createEntity(model: TEntity): Observable<TEntity> {
    const endpoint = this._endpoint;
    return this._http.post<TEntity>(endpoint, model);
  }

  public updateEntity(model: TEntity): Observable<TEntity> {
    const endpoint = this._endpoint;
    return this._http.put<TEntity>(endpoint, model);
  }

  public deleteEntity(id: TId): Observable<string> {
    const endpoint = `${this._endpoint}/${id}`;
    return this._http.delete<string>(endpoint);
  }

  protected _createParamsEndpoint(endpoint: string, params: KeyValue<string, string>[]): string {
    let url = endpoint + '?';
    params.forEach(p => url += `${p.key}=${p.value}&`);
    return url.substring(0, url.lastIndexOf('&'));
  }
}
