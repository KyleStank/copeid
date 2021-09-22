import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Document, DocumentQuery } from '../models';

@Injectable()
export class DocumentService extends AbstractQueryableEntityService<Document, DocumentQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Document`;
  }

  public verifyMime(mimeType: string): Observable<boolean> {
    mimeType = (mimeType ?? '').trim().length === 0 ? 'application/octet-stream' : mimeType;
    const endpoint = `${this._endpoint}/VerifyMime/${encodeURIComponent(mimeType)}`;
    return this._http.get<boolean>(endpoint);
  }
}
