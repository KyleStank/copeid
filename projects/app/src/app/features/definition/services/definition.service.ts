import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractQueryableEntityService } from '@core/services/entity';
import { Definition, DefinitionQuery } from '../models';

@Injectable()
export class DefinitionService extends AbstractQueryableEntityService<Definition, DefinitionQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Definition`;
  }
}
