import { IEntity } from '@core/models/entity';

export interface IFilterSection extends IEntity {
  filterId: string | undefined;
  filterModelPropertyId: string | undefined;
  code: string | undefined;
  displayName: string | undefined;
}

export class FilterSection implements IFilterSection {
  public id: string | undefined;
  public filterId: string | undefined;
  public filterModelPropertyId: string | undefined;
  public code: string | undefined;
  public displayName: string | undefined;

  constructor(model?: Partial<IFilterSection>) {
    this.id = model?.id;
    this.filterId = model?.filterId;
    this.filterModelPropertyId = model?.filterModelPropertyId;
    this.code = model?.code;
    this.displayName = model?.displayName;
  }
}
