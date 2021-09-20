import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { File, FileQuery } from '../models';

@Injectable()
export class FileService extends AbstractQueryableEntityService<File, FileQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/File`;
  }
}
