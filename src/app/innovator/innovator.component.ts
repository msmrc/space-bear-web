import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { combineLatest, tap } from 'rxjs';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-innovator',
  templateUrl: './innovator.component.html',
  styleUrls: ['./innovator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnovatorComponent implements OnInit {

  public title: string = ''
  public subtitle: string = ''
  public callback: any;

  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    combineLatest([this.appStore.pageTitle$, this.appStore.pageSubtitle$, this.appStore.pageAction$]).pipe(
      tap(([title, subtitle, action]) => {
        this.title = title;
        this.subtitle = subtitle;
        this.callback = action;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
