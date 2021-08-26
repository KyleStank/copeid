import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core/services/entity';
import { Definition, DefinitionQuery } from '../models';

@Injectable()
export class DefinitionService extends AbstractEntityService<Definition, DefinitionQuery> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Definition`;
  }
}
