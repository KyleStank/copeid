import { IFilterOption } from './filter-option.model';

export interface IFilterDefinitionSelected<TKey = any, TValue = any> {
  identifier: string;
  option: IFilterOption<TKey, TValue>;
}
