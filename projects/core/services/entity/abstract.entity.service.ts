import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IEntity } from '@core/models/entity';
import { PaginationRequest } from '@core/models/pagination';

@Injectable()
export abstract class AbstractEntityService<TEntity = IEntity> {
  protected readonly _endpoint: string;

  constructor(protected readonly _http: HttpClient) {
    this._endpoint = this.getEndpoint();
  }

  public abstract getEndpoint(): string;

  public getAll(paginationRequest?: PaginationRequest): Observable<TEntity[]> {
    const endpoint = this._endpoint;
    return this._http.get<TEntity[]>(
      paginationRequest ? this._createQueryEndpoint(endpoint, paginationRequest) : endpoint
    );
  }

  public getSingle(id: string): Observable<TEntity> {
    const endpoint = `${this._endpoint}/${id}`;
    return this._http.get<TEntity>(endpoint);
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

  protected _createQueryEndpoint(endpoint: string, query: Object): string {
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
