import { IEntity } from '@core/models/entity';

import { Filter } from './filter.model';
import { FilterModelProperty } from './filter-model-property.model';
import { FilterSectionPart } from './filter-section-part.model';

export interface IFilterSection extends IEntity {
  filterId: string | undefined;
  code: string | undefined;
  displayName: string | undefined;
  filter: Filter | undefined;
  filterSectionParts: FilterSectionPart[] | undefined;
}

export class FilterSection implements IFilterSection {
  public id: string | undefined;
  public filterId: string | undefined;
  public code: string | undefined;
  public displayName: string | undefined;
  public filter: Filter | undefined;
  public filterSectionParts: FilterSectionPart[] | undefined;

  constructor(model?: Partial<IFilterSection>) {
    this.id = model?.id;
    this.filterId = model?.filterId;
    this.code = model?.code;
    this.displayName = model?.displayName;
  }
}
