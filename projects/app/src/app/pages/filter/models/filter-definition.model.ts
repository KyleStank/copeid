import { IFilterOption } from './filter-option.model';

export interface IFilterDefinition<TKey, TValue> {
  identifier: string;
  options: IFilterOption<TKey, TValue>[];
}
