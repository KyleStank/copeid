import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IEntity } from '../models';
import { Nullable } from '../types';

@Injectable()
export abstract class AbstractEntityService<TEntity = IEntity, TId = string> {
  protected readonly _endpoint: string;

  constructor(protected readonly _http: HttpClient) {
    this._endpoint = this.getEndpoint();
  }

  public abstract getEndpoint(): string;

  public getAllEntities(): Observable<TEntity[]> {
    return this._http.get<TEntity[]>(this._endpoint);
  }

  public getEntity(id: TId): Observable<TEntity> {
    return this._http.get<TEntity>(`${this._endpoint}/${id}`);
  }

  public createEntity(model: TEntity): Observable<TEntity> {
    return this._http.post<TEntity>(this._endpoint, model);
  }

  public updateEntity(model: TEntity): Observable<TEntity> {
    return this._http.put<TEntity>(this._endpoint, model);
  }

  public deleteEntity(id: TId): Observable<Nullable<string>> {
    return this._http.delete<Nullable<string>>(`${this._endpoint}/${id}`);
  }
}
