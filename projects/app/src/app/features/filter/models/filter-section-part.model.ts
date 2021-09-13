import { IEntity } from '@core/models/entity';

export interface IFilterSectionPart extends IEntity {
  filterSectionId: string | undefined;
  displayName: string | undefined;
}

export class FilterSectionPart implements IFilterSectionPart {
  public id: string | undefined;
  public filterSectionId: string | undefined;
  public displayName: string | undefined;

  constructor(model?: Partial<IFilterSectionPart>) {
    this.id = model?.id;
    this.filterSectionId = model?.filterSectionId;
    this.displayName = model?.displayName;
  }
}
