import { IEntityQuery } from '@core/models/entity';

export interface IFileQuery extends IEntityQuery {
  name: string[] | undefined;
  path: string[] | undefined;
}

export class FileQuery implements IFileQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public name: string[] | undefined;
  public path: string[] | undefined;

  constructor(model?: Partial<IFileQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.name = model?.name;
    this.path = model?.path;
  }
}
