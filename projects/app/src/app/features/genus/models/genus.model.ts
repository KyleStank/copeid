import { IPhotograph, ISpecimen } from '@app/features';
import { IEntity } from '@core/models/entity';

export interface IGenus extends IEntity {
  photographId: string | undefined;
  photograph: IPhotograph | undefined;

  name: string | undefined;

  specimens: ISpecimen[] | undefined;
}

export class Genus implements IGenus {
  public id: string | undefined;
  public photographId: string | undefined;
  public photograph: IPhotograph | undefined;
  public name: string | undefined;
  public specimens: ISpecimen[] | undefined;

  constructor(model?: Partial<IGenus>) {
    this.id = model?.id;
    this.photographId = model?.photographId;
    this.photograph = model?.photograph;
    this.name = model?.name;
    this.specimens = model?.specimens;
  }
}
