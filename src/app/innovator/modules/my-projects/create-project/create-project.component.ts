import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'create-project',
  templateUrl: 'create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectComponent implements OnInit, OnDestroy {

  public step: number = 1;
  public selectedProjectType = '';

  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appStore.setPageTitle('Добавление проекта');
    this.appStore.setPageSubtitle('Выберете одно из нескольких направлений');
  }

  ngOnDestroy(): void {
    this.appStore.setPageSubtitle('');
  }

  public selectType(type: string) {
    this.selectedProjectType = type;
    this.step = 2;
    this.cdr.detectChanges();
  }
}
