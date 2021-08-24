import { ChangeDetectionStrategy, Component, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ILayoutConfig, LayoutBuilder, LayoutHostDirective, Specimen, SpecimenService } from '@app/features';
import { IFilterDefinition, IFilterDefinitionSelected, IFilterOption, IFilterSection } from '../../models';
import { FilterLengthSectionComponent } from '../../sections';

export interface IFilterSectionConfig {
  componentType: Type<IFilterSection>;
  filterDefinition: IFilterDefinition<any, any>;
}

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

  readonly filterSectionConfigs: IFilterSectionConfig[] = [
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Length of Specimen (mm)',
        options: [
          { key: 'Z', value: 0.5 },
          { key: 'Y', value: 1.0 },
          { key: 'X', value: 1.5 },
          { key: 'W', value: 2.0 }
        ] as IFilterOption<string, number>[]
      }
    },

    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'LL',
        options: [
          { key: 'Z', value: 0.2 },
          { key: 'Y', value: 1.0 },
          { key: 'X', value: 1.5 },
          { key: 'W', value: 2.0 }
        ] as IFilterOption<string, number>[]
      }
    },

    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'LLL',
        options: [
          { key: 'Z', value: 0.3 },
          { key: 'Y', value: 1.0 },
          { key: 'X', value: 1.5 },
          { key: 'W', value: 2.0 }
        ] as IFilterOption<string, number>[]
      }
    }
  ];
  currentFilterSectionConfig?: IFilterSectionConfig;

  @ViewChild(LayoutHostDirective, { static: true })
  layoutHost?: LayoutHostDirective;

  constructor(
    private readonly _layoutBuilder: LayoutBuilder,
    private readonly _specimenService: SpecimenService
  ) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    if (this.filterSectionConfigs.length > 0) {
      this._setupFilterSection(this.filterSectionConfigs[0]);
    }
  }

  private _setupFilterSection(config?: IFilterSectionConfig): void {
    if (!config?.componentType) return;

    const componentRef = this._createFilterSection(
      config.componentType,
      config.filterDefinition ? {
        filterDefinition: config.filterDefinition,
        selectedOption: this._selectedDefinitions.find(x => x.identifier === config?.filterDefinition?.identifier)?.option
      } : null
    );
    if (componentRef) {
      componentRef.instance.optionSelected$
        .pipe(takeUntil(this._destroyed))
        .subscribe(this._selectDefinition.bind(this));
    }

    this.currentFilterSectionConfig = config;
  }

  private _createFilterSection(sectionComponent: Type<IFilterSection>, config?: any): ComponentRef<IFilterSection> | undefined {
    const layoutConfig: ILayoutConfig<IFilterSection> = {
      component: sectionComponent,
      config
    };

    return this._layoutBuilder.generateLayout(this.layoutHost, layoutConfig);
  }

  private _selectDefinition(definition: IFilterDefinitionSelected<any, any>): void {
    if (definition == null) return;

    const index = this._selectedDefinitions.findIndex(x => x.identifier === definition.identifier);
    const def: IFilterDefinitionSelected = {
      identifier: definition.identifier,
      option: definition.option
    };

    if (index === -1) this._selectedDefinitions.push(def);
    else this._selectedDefinitions[index] = def;
  }

  previousSection(): void {
    const currentIndex = this.filterSectionConfigs.findIndex(c => this.currentFilterSectionConfig === c);
    const prevIndex = currentIndex !== 0 && currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    if (prevIndex !== currentIndex) this._setupFilterSection(this.filterSectionConfigs[prevIndex]);
  }

  nextSection(): void {
    const currentIndex = this.filterSectionConfigs.findIndex(c => this.currentFilterSectionConfig === c);
    const nextIndex = currentIndex !== this.filterSectionConfigs.length - 1 && currentIndex + 1 < this.filterSectionConfigs.length ?
      currentIndex + 1 : currentIndex;
    if (nextIndex !== currentIndex) this._setupFilterSection(this.filterSectionConfigs[nextIndex]);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
