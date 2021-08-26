import { IEntityQuery } from '@core/models/entity';

import { SpecimenGender } from './specimen.model';

export interface ISpecimenQuery extends IEntityQuery {
  genusId: string[] | undefined;
  photographId: string[] | undefined;
  gender: SpecimenGender[] | undefined;
  length: number[] | undefined;
  specialCharacteristics: string[] | undefined;
  antenule: string[] | undefined;
  rostrum: string[] | undefined;
  bodyShape: string[] | undefined;
  eyes: string[] | undefined;
  cephalosome: string[] | undefined;
  thorax: string[] | undefined;
  urosome: string[] | undefined;
  furca: string[] | undefined;
  setea: string[] | undefined;
}

export class SpecimenQuery implements ISpecimenQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public genusId: string[] | undefined;
  public photographId: string[] | undefined;
  public gender: SpecimenGender[] | undefined;
  public length: number[] | undefined;
  public specialCharacteristics: string[] | undefined;
  public antenule: string[] | undefined;
  public rostrum: string[] | undefined;
  public bodyShape: string[] | undefined;
  public eyes: string[] | undefined;
  public cephalosome: string[] | undefined;
  public thorax: string[] | undefined;
  public urosome: string[] | undefined;
  public furca: string[] | undefined;
  public setea: string[] | undefined;

  constructor(model?: Partial<ISpecimenQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.genusId = model?.genusId;
    this.photographId = model?.photographId;
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
