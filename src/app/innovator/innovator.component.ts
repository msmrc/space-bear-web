import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-innovator',
  templateUrl: './innovator.component.html',
  styleUrls: ['./innovator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnovatorComponent implements OnInit {

  public title: string = ''

  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.appStore.pageTitle$.pipe(tap((title) => {
      this.title = title;
      this.cdr.detectChanges();
    })).subscribe();
  }
}
