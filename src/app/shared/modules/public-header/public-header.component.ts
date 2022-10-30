import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-header',
  templateUrl: 'public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  public toLogin() {
    this.router.navigate(['/auth/login']);
  }

  public toMain() {
    this.router.navigate(['/']);
  }
}
