import { IEntity } from '@core/models/entity';

import { FilterModelProperty } from './filter-model-property.model';
import { FilterSection } from './filter-section.model';
import { FilterSectionPartOption } from './filter-section-part-option.model';

export interface IFilterSectionPart extends IEntity {
  filterSectionId: string | undefined;
  filterModelPropertyId: string | undefined;
  order: number | undefined;
  displayName: string | undefined;
  filterSection: FilterSection | undefined;
  filterModelProperty: FilterModelProperty | undefined;
  filterSectionPartOptions: FilterSectionPartOption[] | undefined;
}

export class FilterSectionPart implements IFilterSectionPart {
  public id: string | undefined;
  public filterSectionId: string | undefined;
  public filterModelPropertyId: string | undefined;
  public order: number | undefined;
  public displayName: string | undefined;
  public filterSection: FilterSection | undefined;
  public filterModelProperty: FilterModelProperty | undefined;
  public filterSectionPartOptions: FilterSectionPartOption[] | undefined;

  constructor(model?: Partial<IFilterSectionPart>) {
    this.id = model?.id;
    this.filterSectionId = model?.filterSectionId;
    this.filterModelPropertyId = model?.filterModelPropertyId;
    this.order = model?.order;
    this.displayName = model?.displayName;
    this.filterSection = model?.filterSection;
    this.filterModelProperty = model?.filterModelProperty;
    this.filterSectionPartOptions = model?.filterSectionPartOptions;
  }
}
