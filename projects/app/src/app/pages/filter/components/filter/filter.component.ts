import { ChangeDetectionStrategy, Component, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { LayoutHostDirective } from '@core/layouts/directives';
import { ILayoutConfig } from '@core/layouts/models';
import { LayoutBuilder } from '@core/layouts/services';
import { IFilterDefinition, IFilterDefinitionSelected, IFilterOption, IFilterSection } from '../../models';
import { FilterLengthSectionComponent } from '../../sections';

export interface IFilterSectionConfig {
  componentType: Type<IFilterSection>;
  title: string;
  filterDefinition: IFilterDefinition<any, any>;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _selectedDefinitions: IFilterDefinitionSelected<any, any>[] = [];

  readonly filterSectionConfigs: IFilterSectionConfig[] = [
    {
      componentType: FilterLengthSectionComponent,
      title: 'Length of Specimen (mm)',
      filterDefinition: {
        identifier: 'L',
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
      title: 'Eyes of Specimen',
      filterDefinition: {
        identifier: 'E',
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
      title: 'Cephalosome of Specimen',
      filterDefinition: {
        identifier: 'C',
        options: [
          { key: '4', value: '40%' },
          { key: '5', value: '50%' },
          { key: '6', value: '60%' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      title: 'Thorax of Specimen (Segments)',
      filterDefinition: {
        identifier: 'T1',
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
      title: 'Thorax of Specimen (Shape)',
      filterDefinition: {
        identifier: 'T2',
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
      title: 'Urosome of Specimen',
      filterDefinition: {
        identifier: 'U',
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
      title: 'Furca of Specimen',
      filterDefinition: {
        identifier: 'F',
        options: [
          { key: 'S', value: 'Short' },
          { key: 'L', value: 'Long' },
          { key: 'C', value: 'Curved' }
        ] as IFilterOption<string, string>[]
      }
    },
    {
      componentType: FilterLengthSectionComponent,
      title: 'Setea of Specimen',
      filterDefinition: {
        identifier: 'S',
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
    private readonly _layoutBuilder: LayoutBuilder
  ) {}

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
    console.log('Search!');

    // TODO: Update all parts of filter to reflect updated API data.
    // const length = this._selectedDefinitions.find(x => x.identifier === 'L')?.option.value;
    // const eyes = this._selectedDefinitions.find(x => x.identifier === 'E')?.option.value;
    // const cephalosome = this._selectedDefinitions.find(x => x.identifier === 'C')?.option.value;
    // const thoraxSegments = this._selectedDefinitions.find(x => x.identifier === 'T1')?.option.value;
    // const thoraxShape = this._selectedDefinitions.find(x => x.identifier === 'T2')?.option.value;
    // const urosome = this._selectedDefinitions.find(x => x.identifier === 'U')?.option.value;
    // const furca = this._selectedDefinitions.find(x => x.identifier === 'F')?.option.value;
    // const setea = this._selectedDefinitions.find(x => x.identifier === 'S')?.option.value;

    // TODO: Remove.
    // this._filterService.filter(new FilterData({
    //   length,
    //   eyes,
    //   cephalosome,
    //   thoraxSegments,
    //   thoraxShape,
    //   urosome,
    //   furca,
    //   setea
    // })).subscribe({
    //   next: specimen => console.log('Result:', specimen)
    // });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
