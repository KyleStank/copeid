import { IEntity } from '@core/models/entity';

import { FilterModel } from './filter-model.model';
import { FilterSection } from './filter-section.model';

export interface IFilter extends IEntity {
  filterModelId: string | undefined;
  displayName: string | undefined;
  filterModel: FilterModel | undefined;
  filterSections: FilterSection[] | undefined;
}

export class Filter implements IFilter {
  public id: string | undefined;
  public filterModelId: string | undefined;
  public displayName: string | undefined;
  public filterModel: FilterModel | undefined;
  public filterSections: FilterSection[] | undefined;

  constructor(model?: Partial<IFilter>) {
    this.id = model?.id;
    this.filterModelId = model?.filterModelId;
    this.displayName = model?.displayName;
    this.filterModel = model?.filterModel;
    this.filterSections = model?.filterSections;
  }
}
