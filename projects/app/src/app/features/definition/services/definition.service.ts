import { Injectable } from '@angular/core';

import { environment } from '@app/environments';
import { AbstractEntityService } from '@core';
import { Definition } from '../models';

@Injectable()
export class DefinitionService extends AbstractEntityService<Definition> {
  public getEndpoint(): string {
    return `${environment.apiUrl}/Definition`;
  }
}
