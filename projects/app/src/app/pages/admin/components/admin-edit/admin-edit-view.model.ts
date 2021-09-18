import { Observable } from 'rxjs';

import { IEntity } from '@core/models/entity';
import { IAdminContainer, IAdminView } from '../../models';

export interface IAdminEditView<TEntity extends IEntity = IEntity<any>> extends IAdminView {
  model$: Observable<TEntity | undefined>;
  valid: boolean;

  save: () => Observable<TEntity | undefined>;
}

export interface IAdminEditContainer extends IAdminContainer<IAdminEditView> {
  save: () => void;
  back: () => void;
}
