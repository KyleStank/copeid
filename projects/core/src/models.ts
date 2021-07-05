import { Nullable } from './types';

export interface IEntity<TId = string> {
  id: Nullable<TId>;
}
