import { tap, switchMap, BehaviorSubject } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SkillsAndCategory } from 'src/app/shared/interfaces/skills-and-category.interface';
import { DictionariesService } from 'src/app/shared/services/dictionaries.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppStore } from 'src/app/store/app.store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileInterface } from 'src/app/shared/interfaces/user-profile.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';


@Component({
  selector: 'profile-fill',
  templateUrl: 'profile-fill.component.html',
  styleUrls: ['./profile-fill.component.scss']
})
export class ProfileFillComponent implements OnInit {

  public form!: FormGroup;
  public isLoadingForm$ = new BehaviorSubject<boolean>(true);

  // data from API
  public skillsAndCategories: SkillsAndCategory[] = [];
  public tags: string[] = [];

  private userId!: string;
  private currentUser!: UserInterface;

  constructor(
    private appStore: AppStore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dictionariesService: DictionariesService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.appStore.setPageTitle('Заполнение профиля')
    this.appStore.user$.pipe(tap((user) => {
      if (user) {
        this.currentUser = user;
        this.userId = user.id
      }
    })).subscribe();

    this.dictionariesService.getSkillsAndCategories().pipe(
      tap((skillsAndCategories) => this.skillsAndCategories = skillsAndCategories),
      switchMap(() => this.dictionariesService.getTags()),
      tap((tags) => this.tags = tags),
      tap(() => this.isLoadingForm$.next(false))
    ).subscribe();

    this.initializeForm();
  }

  public fillProfile(): void {
    const form = this.form.value;

    const user: UserProfileInterface = {
      userId: this.userId,
      aboutDescription: form.aboutDescription,
      birthDate: form.birthDate,
      citizenship: form.citizenship,
      city: form.city,
      country: form.country,
      experience: form.experience,
      firstName: form.firstName,
      gender: form.gender,
      interestedTags: form.interestedTags,
      lastName: form.lastName,
      secondName: form.secondName,
      skillInformation: form.skillInformation,
    };

    this.userService.createProfile(user).pipe(tap((updatedUser) => {
      this.snackBar.open('Успешно! Ваш профиль обновлен', 'Отлично');
      this.appStore.setUser({
        ...this.currentUser,
        fullUser: updatedUser,
      })
      // set user to appStore
      // redirect to Bot
    })).subscribe();
  }

  get skillInformation(): FormArray {
    return this.form.controls['skillInformation'] as FormArray;
  }

  public getAvailbleSkills(i: number): string[] {
    const selectedCategory = this.skillInformation.controls[i].value.category;
    if (selectedCategory) {
      const filteredSkills = this.skillsAndCategories.filter(x => x.category === selectedCategory)[0].skills;
      return filteredSkills;
    }
    return [];
  }

  public addSkillInformation(): void {
    this.skillInformation.push(
      this.fb.group({
        category: ['', Validators.required],
        skills: [[], Validators.required],
        experience: ['', Validators.required],
      })
    );
  }

  public removeChild(i: number) {
    this.skillInformation.removeAt(i);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      aboutDescription: ['', Validators.required],
      birthDate: ['', Validators.required],
      citizenship: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      interestedTags: [[], Validators.required],
      lastName: ['', Validators.required],
      secondName: ['', Validators.required],
      skillInformation: this.fb.array([]), // form array
    });

    const fullUser = this.currentUser.fullUser;
    if (fullUser) {
      this.form.patchValue({
        aboutDescription: fullUser.aboutDescription,
        birthDate: fullUser.birthDate,
        citizenship: fullUser.citizenship,
        city: fullUser.city,
        country: fullUser.country,
        firstName: fullUser.firstName,
        gender: fullUser.gender,
        interestedTags: fullUser.interestedTags,
        lastName: fullUser.lastName,
        secondName: fullUser.secondName,
      });

      if (fullUser.skillInformation.length > 0) {
        fullUser.skillInformation.forEach((skillInfo) => {
          this.skillInformation.push(
            this.fb.group({
              category: [skillInfo.category, Validators.required],
              skills: [skillInfo.skills, Validators.required],
              experience: [skillInfo.experience, Validators.required],
            })
          );
        })
      }
    }
  }
}
