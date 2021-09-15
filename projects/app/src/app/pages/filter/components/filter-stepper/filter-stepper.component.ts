import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatStep, MatStepper } from '@angular/material/stepper';

import { FilterSection, FilterSectionPartOption } from '@app/features';

@Component({
  selector: 'app-filter-stepper',
  templateUrl: './filter-stepper.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStepperComponent implements OnChanges {
  @ViewChild(MatStepper, { static: true })
  matStepper!: MatStepper;

  @Input()
  color?: ThemePalette = 'primary';

  @Input()
  sections: FilterSection[] = [];

  readonly formSections = this.fb.array([], Validators.required);
  readonly formGroup = this.fb.group({
    sections: this.formSections
  });

  constructor(readonly changeDetectorRef: ChangeDetectorRef, readonly fb: FormBuilder) {}

  ngOnChanges(): void {
    this.sections = this.sections ?? [];
    this.formSections.controls = this.sections.map(section =>
      this.fb.array((section.filterSectionParts ?? []).map(_ =>
        this.fb.control(null, Validators.required)
      ), Validators.required)
    );
  }

  optionSelected(option: FilterSectionPartOption, step: MatStep, controlIndex: number): void {
    const formControl = (step.stepControl as FormArray).controls[controlIndex];
    if (!!formControl) {
      formControl.setValue(option.id);
      step.completed = true;
    } else {
      step.completed = false;
    }

    this.changeDetectorRef.markForCheck();
  }

  hasError(formArray: FormArray): boolean {
    return formArray.controls.some(f => f.errors);
  }

  previous(): void {
    this.matStepper.previous();
    this.changeDetectorRef.markForCheck();
  }

  next(): void {
    this.matStepper.next();
    this.changeDetectorRef.markForCheck();
  }

  filterResults(): void {
    console.log('Filter!');
  }
}
