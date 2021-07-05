import { IPhotograph, ISpecimen } from '@app/features';
import { IEntity, Nullable } from '@core';

export interface IGenus extends IEntity {
  photographId: Nullable<string>;
  photograph: Nullable<IPhotograph>;

  name: Nullable<string>;

  specimens: Nullable<ISpecimen[]>;
}

export class Genus implements IGenus {
  public id: Nullable<string>;
  public photographId: Nullable<string>;
  public photograph: Nullable<IPhotograph>;
  public name: Nullable<string>;
  public specimens: Nullable<ISpecimen[]>;

  constructor(model?: IGenus) {
    this.id = model?.id;
    this.photographId = model?.photographId;
    this.photograph = model?.photograph;
    this.name = model?.name;
    this.specimens = model?.specimens;
  }
}
