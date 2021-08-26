import { IGenus, IPhotograph } from '@app/features';
import { IEntity } from '@core/models/entity';

export enum SpecimenGender {
  Male = 0,
  Female = 1
}

export interface ISpecimen extends IEntity {
  genusId: string | undefined;
  genus: IGenus | undefined;

  photographId: string | undefined;
  photograph: IPhotograph | undefined;

  gender: SpecimenGender | undefined;

  length: number | undefined;
  specialCharacteristics: string | undefined;
  antenule: string | undefined;
  rostrum: string | undefined;
  bodyShape: string | undefined;
  eyes: string | undefined;
  cephalosome: string | undefined;
  thorax: string | undefined;
  urosome: string | undefined;
  furca: string | undefined;
  setea: string | undefined;
}

export class Specimen implements ISpecimen {
  public id: string | undefined;
  public genusId: string | undefined;
  public genus: IGenus | undefined;
  public photographId: string | undefined;
  public photograph: IPhotograph | undefined;
  public gender: SpecimenGender | undefined;
  public length: number | undefined;
  public specialCharacteristics: string | undefined;
  public antenule: string | undefined;
  public rostrum: string | undefined;
  public bodyShape: string | undefined;
  public eyes: string | undefined;
  public cephalosome: string | undefined;
  public thorax: string | undefined;
  public urosome: string | undefined;
  public furca: string | undefined;
  public setea: string | undefined;

  constructor(model?: Partial<ISpecimen>) {
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
