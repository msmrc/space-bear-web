import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { AppStore } from './../../../store/app.store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { InProgressModalComponent } from 'src/app/shared/modules/in-progress-modal/in-progress-modal.component';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userFIO: string = '';

  constructor(
    private appStore: AppStore,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.appStore.user$.pipe(
      tap((user) => {
        const fullUser = user?.fullUser;
        if (fullUser) {
          this.userFIO = `${fullUser.firstName} ${fullUser.secondName}`
        } else {
          this.userFIO = 'spacebear-591259';
        }
      })
    ).subscribe();
  }

  public openProfile() {
    this.router.navigate(['/innovator/profile'])
  }

  public openProjects() {
    this.router.navigate(['/innovator/my-projects/list'])
  }

  public onInProgress() {
    this.dialog.open(InProgressModalComponent, {
      panelClass: 'space-bear'
    });
  }

  public exit() {
    this.appStore.setIsExit(true)
  }
}
