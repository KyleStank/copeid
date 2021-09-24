import { Document } from '@app/features';
import { IEntity } from '@core/models/entity';

export interface IPhotograph extends IEntity {
  documentId: string | undefined;
  title: string | undefined;
  description: string | undefined;

  document: Document | undefined;
}

export class Photograph implements IPhotograph {
  public id: string | undefined;
  public documentId: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public document: Document | undefined;

  constructor(model?: Partial<IPhotograph>) {
    this.id = model?.id;
    this.documentId = model?.documentId;
    this.title = model?.title;
    this.description = model?.description;
    this.document = model?.document;
  }
}
