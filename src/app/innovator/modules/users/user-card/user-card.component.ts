import { tap } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { AppStore } from 'src/app/store/app.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InProgressModalComponent } from 'src/app/shared/modules/in-progress-modal/in-progress-modal.component';

@Component({
  selector: 'app-user-card',
  templateUrl: 'user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent implements OnInit {

  @Input()
  user!: UserProfileInterface;

  @Input()
  isML: boolean = false;

  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  public getSkills(): string[] {
    const skills: string[] = [];

    this.user.skillInformation.forEach((x) => x.skills.forEach((skill) => skills.push(skill)));
    return skills
  }

  public invite() {
    // Открыть диалог
    this.openInProgress();
  }

  public viewUser() {
    this.router.navigate([`/innovator/bears/view/${this.user._id}`]);
  }

  public openInProgress() {
    this.dialog.open(InProgressModalComponent);
  }
}
