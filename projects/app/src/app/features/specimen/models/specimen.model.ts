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
  specialCharacteristics: Nullable<string>;
  antenule: Nullable<string>;
  rostrum: Nullable<string>;
  bodyShape: Nullable<string>;
  eyes: Nullable<string>;
  cephalosome: Nullable<string>;
  thorax: Nullable<string>;
  urosome: Nullable<string>;
  furca: Nullable<string>;
  setea: Nullable<string>;
}

export class Specimen implements ISpecimen {
  public id: Nullable<string>;
  public genusId: Nullable<string>;
  public genus: Nullable<IGenus>;
  public photographId: Nullable<string>;
  public photograph: Nullable<IPhotograph>;
  public gender: Nullable<SpecimenGender>;
  public length: Nullable<number>;
  public specialCharacteristics: Nullable<string>;
  public antenule: Nullable<string>;
  public rostrum: Nullable<string>;
  public bodyShape: Nullable<string>;
  public eyes: Nullable<string>;
  public cephalosome: Nullable<string>;
  public thorax: Nullable<string>;
  public urosome: Nullable<string>;
  public furca: Nullable<string>;
  public setea: Nullable<string>;

  constructor(model?: ISpecimen) {
    this.id = model?.id;
    this.genusId = model?.genusId;
    this.genus = model?.genus;
    this.photographId = model?.photographId;
    this.photograph = model?.photograph;
    this.gender = model?.gender;
    this.length = model?.length;
    this.specialCharacteristics = model?.specialCharacteristics;
    this.antenule = model?.antenule;
    this.rostrum = model?.rostrum;
    this.bodyShape = model?.bodyShape;
    this.eyes = model?.eyes;
    this.cephalosome = model?.cephalosome;
    this.thorax = model?.thorax;
    this.urosome = model?.urosome;
    this.furca = model?.furca;
    this.setea = model?.setea;
  }
}
