import { ILayoutTemplate } from '@app/features';
import { IFilterDefinition } from './filter-definition.model';
import { IFilterOption } from './filter-option.model';

export interface IFilterSection extends ILayoutTemplate {
  filterDefinition: IFilterDefinition<any, any>;
  optionClicked: (option: IFilterOption<any, any>) => void;
}
