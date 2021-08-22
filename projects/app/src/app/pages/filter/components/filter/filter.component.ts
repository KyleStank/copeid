import { ChangeDetectionStrategy, Component, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ILayoutConfig, LayoutBuilder, LayoutHostDirective, Specimen, SpecimenService } from '@app/features';
import { IFilterSection } from '../../models';
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

  @ViewChild(LayoutHostDirective, { static: true })
  layoutHost?: LayoutHostDirective;
  layoutComponentRef?: ComponentRef<IFilterSection>;

  constructor(
    private readonly _layoutBuilder: LayoutBuilder,
    private readonly _specimenService: SpecimenService
  ) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this._destroyed));
    this.specimens$.subscribe({
      next: specimens => console.log('Specimens:', specimens)
    });
  }

  ngOnInit(): void {
    this._specimenService.getAll({
      include: ['genus']
    }).subscribe(this._specimensSubject.next.bind(this._specimensSubject));
    this._generateSection(FilterLengthSectionComponent);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _generateSection(sectionComponent: Type<IFilterSection>, config?: any) {
    const layoutConfig: ILayoutConfig<IFilterSection> = {
      component: sectionComponent,
      config
    };
    this.layoutComponentRef = this._layoutBuilder.generateLayout(this.layoutHost, layoutConfig);
  }
}
