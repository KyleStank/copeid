import { IEntity } from '@core/models/entity';

import { FilterSection } from './filter-section.model';
import { FilterSectionPartOption } from './filter-section-part-option.model';

export interface IFilterSectionPart extends IEntity {
  filterSectionId: string | undefined;
  displayName: string | undefined;
  filterSection: FilterSection | undefined;
  filterSectionPartOptions: FilterSectionPartOption[] | undefined;
}

export class FilterSectionPart implements IFilterSectionPart {
  public id: string | undefined;
  public filterSectionId: string | undefined;
  public displayName: string | undefined;
  public filterSection: FilterSection | undefined;
  public filterSectionPartOptions: FilterSectionPartOption[] | undefined;

  constructor(model?: Partial<IFilterSectionPart>) {
    this.id = model?.id;
    this.filterSectionId = model?.filterSectionId;
    this.displayName = model?.displayName;
    this.filterSection = model?.filterSection;
    this.filterSectionPartOptions = model?.filterSectionPartOptions;
  }
}
