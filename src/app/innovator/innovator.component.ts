import { Component } from '@angular/core';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-innovator',
  templateUrl: './innovator.component.html',
  styleUrls: ['./innovator.component.scss']
})
export class InnovatorComponent {

  constructor(private appStore: AppStore) { }

  public exit() {
    this.appStore.setIsExit(true)
  }
}
