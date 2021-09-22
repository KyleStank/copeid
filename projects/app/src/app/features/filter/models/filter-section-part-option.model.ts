import { IEntity } from '@core/models/entity';

import { FilterSectionPart } from './filter-section-part.model';

export interface IFilterSectionPartOption extends IEntity {
  filterSectionPartId: string | undefined;
  order: number | undefined;
  displayName: string | undefined;
  code: string | undefined;
  value: string | undefined;
  filterSectionPart: FilterSectionPart | undefined;
}

export class FilterSectionPartOption implements IFilterSectionPartOption {
  public id: string | undefined;
  public filterSectionPartId: string | undefined;
  public order: number | undefined;
  public displayName: string | undefined;
  public code: string | undefined;
  public value: string | undefined;
  public filterSectionPart: FilterSectionPart | undefined;

  constructor(model?: Partial<IFilterSectionPartOption>) {
    this.id = model?.id;
    this.filterSectionPartId = model?.filterSectionPartId;
    this.order = model?.order;
    this.displayName = model?.displayName;
    this.code = model?.code;
    this.value = model?.value;
  }
}
