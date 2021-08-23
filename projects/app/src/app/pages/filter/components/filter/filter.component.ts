import { ChangeDetectionStrategy, Component, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ILayoutConfig, LayoutBuilder, LayoutHostDirective, Specimen, SpecimenService } from '@app/features';
import { IFilterDefinition, IFilterDefinitionSelected, IFilterOption, IFilterSection } from '../../models';
import { FilterLengthSectionComponent } from '../../sections';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _specimensSubject = new BehaviorSubject<Specimen[]>([]);
  readonly specimens$ = this._specimensSubject.asObservable();

  private readonly _selectedDefinitions: IFilterDefinitionSelected[] = [];

  readonly filterSectionComponentRefs: ComponentRef<IFilterSection>[] = [];
  readonly filterSectionConfigs: { component: Type<IFilterSection>; filterDefinition: IFilterDefinition<any, any>; }[] = [
    {
      component: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'L',
        options: [
          { key: 'Z', value: 0.5 },
          { key: 'Y', value: 1.0 },
          { key: 'X', value: 1.5 },
          { key: 'W', value: 2.0 }
        ] as IFilterOption<string, number>[]
      }
    }
  ];

  @ViewChild(LayoutHostDirective, { static: true })
  layoutHost?: LayoutHostDirective;

  constructor(
    private readonly _layoutBuilder: LayoutBuilder,
    private readonly _specimenService: SpecimenService
  ) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    // this._specimenService.getAll({
    //   include: ['genus']
    // }).subscribe(this._specimensSubject.next.bind(this._specimensSubject));

    this.filterSectionConfigs.forEach(filterSectionConfig => this._setupFilterSection(filterSectionConfig));
  }

  private _setupFilterSection(config?: { component?: Type<IFilterSection>; filterDefinition?: IFilterDefinition<any, any>; }): void {
    if (!config?.component) return;

    const componentRef = this._createFilterSection(config.component, config.filterDefinition ? { filterDefinition: config.filterDefinition } : null);
    if (componentRef) {
      // Respond to when an option is selected.
      componentRef.instance.optionSelected$
        .pipe(takeUntil(this._destroyed))
        .subscribe(this._selectDefinition.bind(this));

      // Track newly created component ref.
      const index = this.filterSectionComponentRefs.findIndex(x => x === componentRef);
      if (index === -1) this.filterSectionComponentRefs.push(componentRef);
      else this.filterSectionComponentRefs[index] = componentRef;
    }
  }

  private _createFilterSection(sectionComponent: Type<IFilterSection>, config?: any): ComponentRef<IFilterSection> | undefined {
    const layoutConfig: ILayoutConfig<IFilterSection> = {
      component: sectionComponent,
      config
    };

    return this._layoutBuilder.generateLayout(this.layoutHost, layoutConfig);
  }

  private _selectDefinition(definition: IFilterDefinitionSelected<any, any>): void {
    const index = this._selectedDefinitions.findIndex(x => x.identifier === definition.identifier);
    const def: IFilterDefinitionSelected = {
      identifier: definition.identifier,
      option: definition.option
    };

    if (index === -1) this._selectedDefinitions.push(def);
    else this._selectedDefinitions[index] = def;
  }

  previousSection(): void {
    console.log('Previous Section!');
  }

  nextSection(): void {
    console.log('Next Section!');
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
