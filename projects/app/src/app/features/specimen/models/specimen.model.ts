import { IGenus, IPhotograph } from '@app/features';
import { IEntity, Nullable } from '@core';

export enum SpecimenGender {
  Male = 0,
  Female = 1
}

export interface ISpecimen extends IEntity {
  genusId: Nullable<string>;
  genus: Nullable<IGenus>;

  photographId: Nullable<string>;
  photograph: Nullable<IPhotograph>;

  gender: Nullable<SpecimenGender>;

  length: Nullable<number>;
}

export class Specimen implements ISpecimen {
  public id: Nullable<string>;
  public genusId: Nullable<string>;
  public genus: Nullable<IGenus>;
  public photographId: Nullable<string>;
  public photograph: Nullable<IPhotograph>;
  public gender: Nullable<SpecimenGender>;
  public length: Nullable<number>;

  constructor(model?: ISpecimen) {
    this.id = model?.id;
    this.genusId = model?.genusId;
    this.genus = model?.genus;
    this.photographId = model?.photographId;
    this.photograph = model?.photograph;
    this.gender = model?.gender;
    this.length = model?.length;
  }
}
