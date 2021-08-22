import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IEntity, IEntityQuery } from '../models';

@Injectable()
export abstract class AbstractEntityService<TEntity = IEntity, TQuery = IEntityQuery> {
  protected readonly _endpoint: string;

  constructor(protected readonly _http: HttpClient) {
    this._endpoint = this.getEndpoint();
  }

  public abstract getEndpoint(): string;

  public getAll(query?: TQuery): Observable<TEntity[]> {
    const endpoint = this._endpoint;
    return this._http.get<TEntity[]>(query ?
      this._createQueryEndpoint(endpoint, query) : endpoint
    );
  }

  public getSingle(id: string, query?: TQuery): Observable<TEntity> {
    const endpoint = `${this._endpoint}/${id}`;
    return this._http.get<TEntity>(query ?
      this._createQueryEndpoint(endpoint, query) : endpoint
    );
  }

  public create(model: TEntity): Observable<TEntity> {
    const endpoint = this._endpoint;
    return this._http.post<TEntity>(endpoint, model);
  }

  public update(model: TEntity): Observable<TEntity> {
    const endpoint = this._endpoint;
    return this._http.put<TEntity>(endpoint, model);
  }

  public delete(id: string): Observable<string> {
    const endpoint = `${this._endpoint}/${id}`;
    return this._http.delete<string>(endpoint);
  }

  protected _createQueryEndpoint(endpoint: string, query: TQuery): string {
    const params: KeyValue<string, string>[] = [];
    Object.keys(query).forEach(key => {
      const value = (query as any)[key];
      if (value == null) return;

      if (Array.isArray(value)) value.forEach(v => params.push({ key, value: v }));
      else params.push({ key, value: value });
    });
    return this._createParamsEndpoint(endpoint, params);
  }

  protected _createParamsEndpoint(endpoint: string, params: KeyValue<string, string>[]): string {
    let url = endpoint + '?';
    params.forEach(p => url += `${p.key}=${encodeURIComponent(p.value)}&`);
    return url.substring(0, url.lastIndexOf('&'));
  }
}
