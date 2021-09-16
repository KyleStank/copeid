export class FilterStepperOptionValue {
  partId: string | undefined;
  partOptionId: string | undefined;

  constructor(model?: Partial<FilterStepperOptionValue>) {
    this.partId = model?.partId;
    this.partOptionId = model?.partOptionId;
  }
}

export class FilterStepperResult {
  sectionId: string | undefined;
  optionValues: FilterStepperOptionValue[] | undefined;

  constructor(model?: Partial<FilterStepperResult>) {
    this.sectionId = model?.sectionId;
    this.optionValues = model?.optionValues;
  }
}
