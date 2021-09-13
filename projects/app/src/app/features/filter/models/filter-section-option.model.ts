import { IEntity } from '@core/models/entity';

export interface IFilterSectionOption extends IEntity {
  filterSectionId: string | undefined;
  displayName: string | undefined;
  code: string | undefined;
  value: string | undefined;
}

export class FilterSectionOption implements IFilterSectionOption {
  public id: string | undefined;
  public filterSectionId: string | undefined;
  public displayName: string | undefined;
  public code: string | undefined;
  public value: string | undefined;

  constructor(model?: Partial<IFilterSectionOption>) {
    this.id = model?.id;
    this.filterSectionId = model?.filterSectionId;
    this.displayName = model?.displayName;
    this.code = model?.code;
    this.value = model?.value;
  }
}
