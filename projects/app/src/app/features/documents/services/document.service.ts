import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Document, DocumentQuery } from '../models';

@Injectable()
export class DocumentService extends AbstractQueryableEntityService<Document, DocumentQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Document`;
  }
}
