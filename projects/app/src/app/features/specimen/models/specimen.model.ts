import { IGenus, IPhotograph } from '@app/features';
import { IEntity } from '@core/models/entity';

import { SpecimenEyes } from './specimen-eyes.model';
import { SpecimenFurca } from './specimen-furca.model';
import { SpecimenGender } from './specimen-gender.model';
import { SpecimenSetea } from './specimen-setea.model';
import { SpecimenThoraxSegments } from './specimen-thorax-segments.model';
import { SpecimenThoraxShape } from './specimen-thorax-shape.model';

export interface ISpecimen extends IEntity {
  // Basic Information
  genusId: string | undefined;
  genus: IGenus | undefined;
  photographId: string | undefined;
  photograph: IPhotograph | undefined;
  gender: SpecimenGender | undefined;
  length: number | undefined;
  summary: string | undefined;
  specialCharacteristics: string | undefined;

  // Antenule
  antenuleDescription: string | undefined;
  antenule: string | undefined;

  // Rostrum
  rostrumDescription: string | undefined;
  rostrum: string | undefined;

  // Body Shape
  bodyShapeDescription: string | undefined;
  bodyShape: string | undefined;

  // Eyes
  eyesDescription: string | undefined;
  eyes: SpecimenEyes | undefined;

  // Cephalosome
  cephalosomeDescription: string | undefined;
  cephalosome: number | undefined;

  // Thorax
  thoraxDescription: string | undefined;
  thoraxSegments: SpecimenThoraxSegments | undefined;
  thoraxShape: SpecimenThoraxShape | undefined;

  // Urosome
  urosomeDescription: string | undefined;
  urosome: number | undefined;

  // Furca
  furcaDescription: string | undefined;
  furca: SpecimenFurca | undefined;

  // Setea
  seteaDescription: string | undefined;
  setea: SpecimenSetea | undefined;
}

export class Specimen implements ISpecimen {
  // Basic Information
  public id: string | undefined;
  public genusId: string | undefined;
  public genus: IGenus | undefined;
  public photographId: string | undefined;
  public photograph: IPhotograph | undefined;
  public gender: SpecimenGender | undefined;
  public length: number | undefined;
  public summary: string | undefined;
  public specialCharacteristics: string | undefined;

  // Antenule
  public antenuleDescription: string | undefined;
  public antenule: string | undefined;

  // Rostrum
  public rostrumDescription: string | undefined;
  public rostrum: string | undefined;

  // Body Shape
  public bodyShapeDescription: string | undefined;
  public bodyShape: string | undefined;

  // Eyes
  public eyesDescription: string | undefined;
  public eyes: SpecimenEyes | undefined;

  // Cephalosome
  public cephalosomeDescription: string | undefined;
  public cephalosome: number | undefined;

  // Thorax
  public thoraxDescription: string | undefined;
  public thoraxSegments: SpecimenThoraxSegments | undefined;
  public thoraxShape: SpecimenThoraxShape | undefined;

  // Urosome
  public urosomeDescription: string | undefined;
  public urosome: number | undefined;

  // Furca
  public furcaDescription: string | undefined
  public furca: SpecimenFurca | undefined;

  // Setea
  public seteaDescription: string | undefined
  public setea: SpecimenSetea | undefined;

  constructor(model?: Partial<ISpecimen>) {
    // Basic Information
    this.id = model?.id;
    this.genusId = model?.genusId;
    this.genus = model?.genus;
    this.photographId = model?.photographId;
    this.photograph = model?.photograph;
    this.gender = model?.gender;
    this.length = model?.length;
    this.summary = model?.summary;
    this.specialCharacteristics = model?.specialCharacteristics;

    // Antenule
    this.antenuleDescription = model?.antenuleDescription;
    this.antenule = model?.antenule;

    // Rostrum
    this.rostrumDescription = model?.rostrumDescription;
    this.rostrum = model?.rostrum;

    // Body Shape
    this.bodyShapeDescription = model?.bodyShapeDescription;
    this.bodyShape = model?.bodyShape;

    // Eyes
    this.eyesDescription = model?.eyesDescription;
    this.eyes = model?.eyes;

    // Cephalosome
    this.cephalosomeDescription = model?.cephalosomeDescription;
    this.cephalosome = model?.cephalosome;

    // Thorax
    this.thoraxDescription = model?.thoraxDescription;
    this.thoraxSegments = model?.thoraxSegments;
    this.thoraxShape = model?.thoraxShape;

    // Urosome
    this.urosomeDescription = model?.urosomeDescription;
    this.urosome = model?.urosome;

    // Furca
    this.furcaDescription = model?.furcaDescription;
    this.furca = model?.furca;

    // Setea
    this.seteaDescription = model?.seteaDescription;
    this.setea = model?.setea;
  }
}

export class SpecimenDisplay extends Specimen {
  public documentUri: string | undefined;

  constructor(model?: Partial<ISpecimen>, documentUri?: string) {
    super(model);
    this.documentUri = documentUri;
  }
}
