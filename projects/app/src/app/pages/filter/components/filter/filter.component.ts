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

  private readonly _selectedDefinitions: IFilterDefinitionSelected<any, any>[] = [];

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
        identifier: 'Eyes of Specimen',
        options: [
          { key: '0', value: 'None' },
          { key: '1', value: 'Dorsal Single' },
          { key: '2', value: 'Ventral Single' },
          { key: '3', value: 'Transformed' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Cephalosome of Specimen',
        options: [
          { key: '4', value: '40%' },
          { key: '5', value: '50%' },
          { key: '6', value: '60%' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Thorax of Specimen (Segments)',
        options: [
          { key: '2', value: '2 Segments' },
          { key: '3', value: '3 Segments' },
          { key: '4', value: '4 Segments' },
          { key: '5', value: 'Fused 4 & 5' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Thorax of Specimen (Shape)',
        options: [
          { key: 'B', value: 'Blunt Shape' },
          { key: 'S', value: 'Saddle Shape' },
          { key: 'P2', value: '2 Pointed' },
          { key: 'P4', value: '4 Points' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Urosome of Specimen',
        options: [
          { key: '1', value: '1' },
          { key: '2', value: '2' },
          { key: '3', value: '3' },
          { key: '4', value: '4' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Furca of Specimen',
        options: [
          { key: 'S', value: 'Short' },
          { key: 'L', value: 'Long' },
          { key: 'C', value: 'Curved' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      filterDefinition: {
        identifier: 'Setea of Specimen',
        options: [
          { key: 'S', value: 'Shorter than Furca' },
          { key: 'M', value: 'Same Length as Furca' },
          { key: 'L', value: 'Longer than Furca' }
        ] as IFilterOption<string, string>[]
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

  search(): void {

  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
