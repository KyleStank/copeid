import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Document, DocumentQuery } from '../models';
import { DocumentMimeType } from '../view-models';

@Injectable()
export class DocumentService extends AbstractQueryableEntityService<Document, DocumentQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Document`;
  }

  public getDocumentUri(id: string): Observable<string> {
    const endpoint = `${this._endpoint}/${id}/Uri`;
    return this._http.get(endpoint, {
      responseType: 'text'
    });
  }

  public verifyMime(model: DocumentMimeType): Observable<boolean> {
    const mimeType = (model?.mimeType ?? '').trim();
    model.mimeType = mimeType.length === 0 ? 'application/octet-stream' : mimeType;

    const endpoint = `${this._endpoint}/VerifyMime`;
    return this._http.post<boolean>(endpoint, model);
  }
}
