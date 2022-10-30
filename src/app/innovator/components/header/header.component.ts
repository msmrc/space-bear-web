import { AppStore } from './../../../store/app.store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private appStore: AppStore,
    private router: Router
  ) { }

  ngOnInit() { }

  public openProfile() {
    this.router.navigate(['/innovator/profile'])
  }

  public exit() {
    this.appStore.setIsExit(true)
  }
}
