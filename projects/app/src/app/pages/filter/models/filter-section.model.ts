import { Observable } from 'rxjs';

import { ILayoutTemplate } from '@app/features';
import { IFilterDefinitionSelected } from './filter-definition-selected.model';
import { IFilterDefinition } from './filter-definition.model';
import { IFilterOption } from './filter-option.model';

export interface IFilterSection extends ILayoutTemplate {
  filterDefinition: IFilterDefinition<any, any> | undefined;
  optionSelected$: Observable<IFilterDefinitionSelected<any, any>>;

  selectOption: (option: IFilterOption<any, any>) => void;
}
