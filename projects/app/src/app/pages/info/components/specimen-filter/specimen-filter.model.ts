import { SpecimenEyes, SpecimenFurca, SpecimenGender, SpecimenSetea, SpecimenThoraxSegments, SpecimenThoraxShape } from '@app/features';

export interface ISpecimenFilterValue {
  genusName: string | undefined;
  gender: SpecimenGender | undefined;
  lengthGreaterThan: number | undefined;
  lengthLessThan: number | undefined;
  antenule: string | undefined;
  rostrum: string | undefined;
  bodyShape: string | undefined;
  eyes: SpecimenEyes | undefined;
  cephalosome: number | undefined;
  thoraxSegments: SpecimenThoraxSegments | undefined;
  thoraxShape: SpecimenThoraxShape | undefined;
  urosome: number | undefined;
  furca: SpecimenFurca | undefined;
  setea: SpecimenSetea | undefined;
}
