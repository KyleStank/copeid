import { Nullable } from './types';

export interface IEntity<T = string> {
  id: Nullable<T>;
}
