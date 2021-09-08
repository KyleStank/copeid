import { Observable } from 'rxjs';

import { IEntity } from '@core/models/entity';

export interface IAdminEditView<TEntity extends IEntity = any> {
  model$: Observable<TEntity | undefined>;

  save: () => Observable<TEntity>;
  updateModelTitle: () => string | undefined;
}
