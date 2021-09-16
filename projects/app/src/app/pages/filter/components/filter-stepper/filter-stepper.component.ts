import { animate, style, transition, trigger } from '@angular/animations';
import { CdkStep } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatStep, MatStepper } from '@angular/material/stepper';

import { FilterSection, FilterSectionPartOption } from '@app/features';
import { FilterStepperOptionValue, FilterStepperResult } from './filter-stepper.model';

@Component({
  selector: 'app-filter-stepper',
  templateUrl: './filter-stepper.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ 'opacity': '0' }),
        animate('250ms ease-in-out', style({ 'opacity': '1' }))
      ])
    ])
  ]
})
export class FilterStepperComponent implements OnChanges {
  @ViewChild(MatStepper, { static: true })
  matStepper!: MatStepper;
  get steps(): MatStep[] { return this.matStepper.steps.toArray(); }
  get selected(): CdkStep | undefined { return this.matStepper.selected; }
  get selectedIndex(): number { return this.matStepper.selectedIndex; }
  get isLastStep(): boolean { return this.selectedIndex === this.steps.length - 1; }

  @Input()
  color?: ThemePalette = 'primary';

  @Input()
  sections: FilterSection[] = [];

  @Output()
  search = new EventEmitter<FilterStepperResult[]>();

  isSelectionUpdating = false;

  readonly formSections = this.fb.array([], Validators.required);
  readonly formGroup = this.fb.group({
    sections: this.formSections
  });

  constructor(readonly changeDetectorRef: ChangeDetectorRef, readonly fb: FormBuilder) {}

  ngOnChanges(): void {
    this.sections = this.sections ?? [];

    this.formSections.controls = this.sections.map(section =>
      this.fb.group({
        sectionId: [section.id, Validators.required],
        options: this.fb.array((section.filterSectionParts ?? []).map(_ =>
          this.fb.control(null, Validators.required)
        ))
      })
    );
  }

  optionSelected(section: FilterSection, option: FilterSectionPartOption, step: MatStep, controlIndex: number): void {
    const sectionIndex = this.sections.indexOf(section);
    const sectionControl = this.formSections.controls[sectionIndex];
    const optionControl = (sectionControl.get('options') as FormArray).controls[controlIndex];
    if (!!optionControl) {
      optionControl.setValue(new FilterStepperOptionValue({
        partId: option.filterSectionPartId,
        partOptionId: option.id
      }));

      if (optionControl.valid) this.next();
    }
  }

  hasError(formArray: FormArray): boolean {
    return formArray.controls.some(f => f.errors);
  }

  previous(): void {
    if (this.selectedIndex !== 0) this.matStepper.previous();
  }

  next(): void {
    if (this.selectedIndex < this.steps.length - 1) this.matStepper.next();
  }

  filterResults(): void {
    this.search.emit(
      this.formSections.controls.map(c => {
        const sectionId = c.get('sectionId')!.value;
        const optionControls = (c.get('options') as FormArray);

        return new FilterStepperResult({
          sectionId,
          optionValues: optionControls.controls.map(o => new FilterStepperOptionValue(o.value))
        });
      })
    );
  }
}
